import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";
import fs from "fs";

const firebaseConfig = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const storageRef = ref(storage, 'test.txt');
uploadString(storageRef, 'Hello World').then(() => {
  console.log('Upload success');
  process.exit(0);
}).catch((err) => {
  console.error('Upload failed:', err.message);
  process.exit(1);
});
