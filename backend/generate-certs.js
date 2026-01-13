/**
 * Generate self-signed SSL certificates for HTTPS development
 * Run with: node generate-certs.js
 *
 * This script first attempts to run OpenSSL. If OpenSSL is not available
 * (common on some Windows setups), it falls back to using the `selfsigned`
 * npm package so you don't need OpenSSL installed.
 */

import { exec } from "child_process";
import { mkdir } from "fs/promises";
import { existsSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certsDir = path.join(__dirname, "certs");

function runOpenSSL(keyPath, certPath) {
  const command = `openssl req -x509 -newkey rsa:2048 -keyout "${keyPath}" -out "${certPath}" -days 365 -nodes -subj "/CN=localhost"`;
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      resolve();
    });
  });
}

async function runSelfSigned(keyPath, certPath) {
  try {
    const selfsigned = (await import("selfsigned")).default;
    const attrs = [{ name: "commonName", value: "localhost" }];
    const pems = selfsigned.generate(attrs, { days: 365, keySize: 2048 });
    writeFileSync(keyPath, pems.private, { encoding: "utf8" });
    writeFileSync(certPath, pems.cert, { encoding: "utf8" });
  } catch (err) {
    throw err;
  }
}

async function generateCerts() {
  try {
    // Create certs directory if it doesn't exist
    if (!existsSync(certsDir)) {
      await mkdir(certsDir, { recursive: true });
      console.log("Created certs directory");
    }

    const keyPath = path.join(certsDir, "server.key");
    const certPath = path.join(certsDir, "server.crt");

    // Check if certificates already exist
    if (existsSync(keyPath) && existsSync(certPath)) {
      console.log("SSL certificates already exist in ./certs directory");
      return;
    }

    // Try OpenSSL first
    try {
      await runOpenSSL(keyPath, certPath);
      console.log("✓ SSL certificates generated with OpenSSL!");
      console.log(`✓ Key file: ${keyPath}`);
      console.log(`✓ Certificate file: ${certPath}`);
      return;
    } catch (err) {
      console.warn(
        "OpenSSL not available or failed. Falling back to self-signed JS generation."
      );
    }

    // Fallback to self-signed JS generation
    try {
      await runSelfSigned(keyPath, certPath);
      console.log("✓ SSL certificates generated with selfsigned package!");
      console.log(`✓ Key file: ${keyPath}`);
      console.log(`✓ Certificate file: ${certPath}`);
      console.log("\nYour HTTPS server is now ready to run!");
    } catch (err) {
      console.error(
        "Error generating certificates with fallback:",
        err.message || err
      );
      console.error(
        "Install OpenSSL or add the 'selfsigned' package to devDependencies and try again."
      );
      process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error.message || error);
    process.exit(1);
  }
}

generateCerts();
