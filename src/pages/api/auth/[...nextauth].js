// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";


// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;

//         try {
//           // Envoyer les identifiants à votre API avec axios
//           const res = await axios.post(`${process.env.NEXT_PUBLIC_OLD_API_URL}/auth/users/signin`, {
//             email,
//             password,
//           });

//           const user = res.data;
//           // console.log('API Response:', user);

//           // Vérifier si l'utilisateur est valide
//           if (res.status === 200 && user) {
//             // Retourner la structure complète
//             return {
//               ...user.user, // Les propriétés de l'utilisateur
//               token: user.token // Le token si nécessaire
//             };
//           }
//           throw new Error("Identifiants incorrects. Veuillez réessayer.");
//         } catch (error) {
//           // Gérer les erreurs selon le code de statut HTTP
//           let errorMessage = "Une erreur est survenue";
          
//           if (error.response) {
//             switch (error.response.status) {
//               case 500:
//                 errorMessage = "Identifiants incorrects. Veuillez réessayer.";
//                 break;
//               // case 422:
//               //   errorMessage = "Le mot de passe doit contenir au moins une majuscule, une minuscule, un caractère spécial et un chiffre.";
//               //   break;
//               default:
//                 errorMessage = error.response.data?.message || "Une erreur est survenue";
//             }
//           }
          
//           console.error("Login failed:", errorMessage);
//           throw new Error(errorMessage);
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       // Ajouter le token JWT à l'utilisateur
//       if (user) {
//         token = user;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // Ajouter les informations utilisateur à la session
//       session.user = token;
//       return session;
//     },
//   },
  
//   pages: {
//     signIn: "/signin",// Page de connexion personnalisée

//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt", // Utilisation de JWT pour les sessions
//   },
// });



import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Utilisateur statique pour la démonstration
        const validEmail = "adinsiabdias@gmail.com";
        const validPassword = "Devgeek@2025";

        // Vérification des identifiants
        if (email === validEmail && password === validPassword) {
          // Si les identifiants sont corrects, retourner un utilisateur fictif
          return {
            id: 1,
            email: validEmail,
            name: "Adinsi Abdias",
            token: "dummy-jwt-token", // Tu peux ajouter un token factice si nécessaire
          };
        } else {
          // Si l'authentification échoue, retourner une erreur
          throw new Error("Identifiants incorrects.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Si l'utilisateur est authentifié, ajouter ses données dans le token
      if (user) {
        token = {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          token: user.token, // Ajouter le token si nécessaire
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Ajouter les informations de l'utilisateur dans la session
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/signin", // Rediriger vers la page de connexion personnalisée
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Utiliser JWT pour la session
  },
});
