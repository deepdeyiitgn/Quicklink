import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

export default defineConfig(({ mode }) => {
    // Load .env files from the project root. The third argument '' makes all env variables
    // available on the `env` object, not just those prefixed with VITE_.
    const env = loadEnv(mode, process.cwd(), '');
    
    // --- Self-Destruction Security Check ---
    // This check prevents unauthorized deployment of the repository.
    // A valid `PROJECT_ACCESS_KEY` must be present in the environment variables.
    const SECRET_HASH = "RGVlcERleUAxMjMkQXlhbm5hQ2hhdHRlcmplZUAxMjMjMjM0MjE="; // Token for "If u want To get This Then Contact" ~ if delete this code or delete the security system then build will automatically faild due to our self destruction technology, it is on all aea of our code so dont think about it! Alo we have legal Rights to take steps against you!

    try {
        if (!env.PROJECT_ACCESS_KEY) {
            throw new Error("PROJECT_ACCESS_KEY environment variable not found. Please ensure it is set in your deployment environment.");
        }
        
        // Encode the user-provided key and compare it to the stored hash.
        // This is more robust as it avoids potential decoding issues in different environments.
        const providedKeyHash = Buffer.from(env.PROJECT_ACCESS_KEY, 'utf8').toString('base64');
        
        if (providedKeyHash !== SECRET_HASH) {
            throw new Error("Access key mismatch. Please ensure the PROJECT_ACCESS_KEY is correct.");
        }
    } catch (e) {
        console.error("\n\n\n=======================================================");
        console.error("!!! UNAUTHORIZED BUILD ATTEMPT DETECTED !!!");
        console.error("=======================================================");
        console.error("This is a private repository. To deploy this project, you must obtain a valid access key.");
        console.error("Contact team.deepdey@gmail.com for authorization.");
        console.error(`Reason: ${(e as Error).message}`);
        console.error("=======================================================\n\n\n");
        process.exit(1); // Fails the build process with a non-zero exit code.
    }
    // --- End of Security Check ---

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.VITE_RECAPTCHA_SITE_KEY': JSON.stringify(env.VITE_RECAPTCHA_SITE_KEY),
        'process.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(env.VITE_GOOGLE_CLIENT_ID),
      },
      resolve: {
        alias: {
          // FIX: Replaced `__dirname` which is not available in ES modules with `.` which resolves from the current working directory.
          '@': path.resolve('.'),
        }
      }
    };
});
