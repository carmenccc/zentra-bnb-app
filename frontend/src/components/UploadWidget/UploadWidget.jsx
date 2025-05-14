import { createContext, useEffect, useRef, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setState }) {
  const [loaded, setLoaded] = useState(false);
  const widgetRef = useRef(null);

  // Load Cloudinary script
  useEffect(() => {
    const uwScript = document.getElementById("uw");
    // Check if the script is already loaded
    if (!uwScript) {
      // If not loaded, create and load the script
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("id", "uw");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.addEventListener("load", () => setLoaded(true));
      document.body.appendChild(script);
    } else {
      // If already loaded, update the state
      setLoaded(true);
    }
  }, []);

  // Initialize widget
  useEffect(() => {
    if (!loaded) return;

    const interval = setInterval(() => {
      if (window.cloudinary && !widgetRef.current) {
        widgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done! Here is the image info: ", result.info);
              setState((prev) => [...prev, result.info.secure_url]);
            }
          }
        );
        clearInterval(interval);
      }
    }, 100);
  }, [loaded, uwConfig, setState]);

  const handleClick = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      console.warn("Widget not ready yet");
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={handleClick}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
