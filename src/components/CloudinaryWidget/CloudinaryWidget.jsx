import { source } from "@cloudinary/url-gen/actions/overlay";
import useStore from "../../zustand/store";
import { useState } from "react";
import { useScript} from "../../hooks/useScript";

export default function CloudinaryWidget() {
  const [localState, setLocalState] = useState({
    file_url: null,
    file_type: "image",
    description: "",
  });

  const addUploadedFIle = useStore((state) => state.addUploadedFIle);

  useScript("https://widget.cloudinary.com/v2.0/global/all.js");

  const openWidget = () => {
    if (!!window.cloudinary) {
      window.cloudinary
        .createUploadWidget(
          {
            sources: ["local", "url", "camera"],
            cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
            uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              setLocalState((prev) => ({
                ...prev,
                file_url: result.info.secure_url,
              }));
            }
          }
        )
        .open();
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!localState.file_type.url) {
      alert("Please select a file for upload");
      return;
    }

    addUploadedFIle({
      url: localState.file_url,
      type: lcoaltState.file_type,
      description: localState.description,
    });

    setLocalState({ file_url: null, file_type: "image", description: "" });

    return (
      <form onSubmit={onSubmit}>
        <h2>Upload New File</h2>
        <button type="button" onClick={openWidget}>
          Pick File
        </button>
        <div>
          <label>File Type: </label>
          <select
            value={localState.file_type}
            onChange={(e) =>
              setLocalState({ ...localState, file_type: e.target.value })
            }
          >
            <option value="image">Image</option>
          </select>
        </div>
        {localState.file_url && (
          <div>
            <p>Uploaded Image URL: {localState.file_url}</p>
            <img src={localState.file_url} alt="Uploaded preview" width={100} />
          </div>
        )}
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={localState.description}
            onChange={(e) =>
              setLocalState({ ...localState, description: e.target.value })
            }
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  };
}