import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Auth, authState, getAuth, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, updateProfile } from '@angular/fire/auth';
import { User, sendPasswordResetEmail } from 'firebase/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, createUserWithEmailAndPassword, FacebookAuthProvider, UserCredential } from 'firebase/auth';
import { Observable, Subject, firstValueFrom, map } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { getStorage, ref, uploadString, getDownloadURL, uploadBytes } from 'firebase/storage';
import { FirestoreService } from './firebase.service';




// Interfaz para manejar las respuestas de error
interface ErrorResponde {
  code: string;
  message: string;
}

interface UserProfile {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private errorSubject = new Subject<string>();
  error$ = this.errorSubject.asObservable();

  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly googleProvider = new GoogleAuthProvider();

  $user: Observable<UserProfile | null>;
  errorMessages: string[] = [];
  

  

  constructor(
    private firestoreService: FirestoreService,
    auth: Auth,
    ) {
    this.auth = auth;
    // this.signOut();
    this.$user = authState(auth);
  }
  

  // Método para iniciar sesión con Facebook
  async signInWithFacebook(): Promise<void> {
    try {
      const provider = new FacebookAuthProvider();  
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      // Manejar errores durante el inicio de sesión con Facebook
      this.handleError(error);
    }
  }

  // Manejar errores y almacenar mensajes
  private handleError(error: any): void {
    let errorMessage = 'Error desconocido al iniciar sesión.';

    if (error.code === 'your_specific_error_code') {
      errorMessage = 'Mensaje de error específico.';
    }

    // Emitir el mensaje de error a través del observable
    this.errorSubject.next(errorMessage);
  }



  getCurrentUser(): Promise<User | null> {
    return firstValueFrom(authState(this.auth));
  }


  // Observable para obtener el estado de autenticación del usuario
  get userState$() {
    return authState(this.auth);
  }

  // Método para iniciar sesión con Google
  async signInGoogle(): Promise<void> {
    try {
      // Utiliza signInWithRedirect en lugar de signInWithPopup
      await signInWithRedirect(this.auth, this.googleProvider);
    } catch (error) {
      console.error('Google login', error);
    }
  }

  // Método para registrarme
  async signUpWithProfilePicture(email: string, password: string, displayName: string, photo: File | null): Promise<UserProfile> {
    try {
      // Crear un nuevo usuario con nombre de usuario
      const { user } = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );


      // Actualizar el nombre de usuario
      await updateProfile(user, { displayName });

      // Subir la foto de perfil a Firebase Storage
      if (photo) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${user?.uid}`);
        await uploadBytes(storageRef, photo);
        
        // Obtener la URL de descarga de la foto y actualizar el perfil del usuario
        const photoURL = await getDownloadURL(storageRef);
        await updateProfile(user, { displayName, photoURL });
        // Navegar a la ruta '/home' después de un registro exitoso
      this.router.navigate(['/home']);
      } else {
        // Si no hay foto, actualizar solo el nombre de usuario
        await updateProfile(user, { displayName });
      }
       // Crear documento del usuario en Firestore
       const userData = { uid: user?.uid, displayName, photoURL: null, balance: 0 };
       await this.firestoreService.createUser(user?.uid || '', userData);

      

      // Devolver la información del usuario
      return {
        
        uid: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
      };
      
    } catch (error: unknown) {
      // Manejar errores durante el registro
      const { code, message } = error as ErrorResponde;
      console.log('Code', code);
      console.log('Message', message);
      throw error;
    }
  }

  // metodo para iniciar sesion
  async signIn(email: string, password: string, photo: File | null): Promise<any> {
    try {
      // Iniciar sesión con correo electrónico y contraseña
      const { user } = await signInWithEmailAndPassword(this.auth, email, password);

      // Subir la foto de perfil si se proporciona
      if (photo) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${user?.uid}`);
        await uploadBytes(storageRef, photo);

        // Obtener la URL de descarga de la foto y actualizar el perfil del usuario
        const photoURL = await getDownloadURL(storageRef);
        await updateProfile(user, { photoURL });
        
      }
      this.router.navigate(['/wallet']);

      // Devolver la información del usuario
      return {
        uid: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        
      };
    } catch (error: unknown) {
      // Manejar errores durante el inicio de sesión
      const { code, message } = error as ErrorResponde;
      console.log('Code', code);
      console.log('Message', message);
      throw error;
    }
  }

  // Método para cerrar sesión
  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']);
    } catch (error: unknown) {
      console.log(error);
    }
  }

  // Método para enviar un correo electrónico de restablecimiento de contraseña
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: unknown) {
      console.log(error);
    }
  }

 




}
