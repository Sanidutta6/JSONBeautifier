import React, { useState } from "react";
import FileUploadModal from "./FileUploadModal";
import TextArea from "./TextArea";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JSONBeautifier = () => {
  const [rawJsonLineCount, setRawJsonLineCount] = useState(1);
  const [formattedJsonLineCount, setFormattedJsonLineCount] = useState(1);
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [isRemote, setIsRemote] = useState(false);

  const handleInputChange = (event) => {
    const rawJson = event.target.value;
    setJsonInput(rawJson);
    setRawJsonLineCount(rawJson.split("\n").length);
  };

  const handleValidate = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const beautifiedJson = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(beautifiedJson);
      setFormattedJsonLineCount(beautifiedJson.split("\n").length);
    } catch (error) {
      setFormattedJson("Invalid JSON");
      setFormattedJsonLineCount(1);
    }
  };
  const handleClear = () => {
    setJsonInput("");
    setRawJsonLineCount(1);
    setFormattedJson("");
    setFormattedJsonLineCount(1);
    setIsRemote(false);
  };

  const handleFileUpload = (fileContent) => {
    setJsonInput(fileContent);
    setRawJsonLineCount(fileContent.split("\n").length);
  };

  return (
    <div>
      <div className="bg-background-1 flex h-screen w-screen items-center justify-center">
        {showFileUploadModal && (
          <FileUploadModal
            setShowFileUploadModal={setShowFileUploadModal}
            handleFileUpload={handleFileUpload}
            isRemote={isRemote}
          />
        )}
        <div className="bg-background-2 flex h-4/5 w-10/12 rounded-[36px] px-6 text-white">
          {/* <!-- Raw JSON --> */}
          <div className="h-full w-4/5 pt-6">
            <h1 className="mb-4 text-lg font-semibold">Edit JSON</h1>
            <div className="flex h-5/6 overflow-auto scrollbar-thin scrollbar-thumb-slate-500">
              {/* <!-- Line Number --> */}
              <div className="w-8 h-full px-1">
                {Array.from(
                  { length: rawJsonLineCount },
                  (_, index) => index + 1
                ).map((lineNumber) => (
                  <div key={lineNumber} className="text-sm text-color-1">
                    {lineNumber}
                  </div>
                ))}
              </div>
              {/* <!-- For pasting the json --> */}
              <TextArea jsonInput={jsonInput} handleInputChange={handleInputChange} />
            </div>
          </div>

          {/* <!-- Options --> */}
          <div className="bg-background-3 mx-6 h-full w-3/5 rounded-3xl px-4 pt-6 text-black">
            <h1 className="mb-4 text-center text-2xl font-semibold">
              JSON Beautifier
            </h1>
            <div className="h-4/5 flex flex-col justify-center items-center gap-8">
              <button
                className="w-full rounded-md border border-black px-3 py-2 text-lg font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => {
                  setIsRemote(false)
                  setShowFileUploadModal(!showFileUploadModal)
                }}
              >
                Upload File
              </button>
              <button
                className="w-full rounded-md border border-black px-3 py-2 text-lg font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => {
                  setIsRemote(true)
                  setShowFileUploadModal(!showFileUploadModal)
                }}
              >
                URL
              </button>
              <button
                className="w-full rounded-md border border-black px-3 py-2 text-lg font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={handleValidate}
              >
                Validate
              </button>
              <button
                className="w-full rounded-md border border-black px-3 py-2 text-lg font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>

          {/* <!-- Formatted JSON --> */}
          <div className="h-full w-4/5 pt-6">
            <div className="mb-4 flex justify-between">
              <h1 className="text-lg font-semibold">Formatted JSON</h1>
              <ToastContainer />
              <svg
                className="cursor-pointer rounded-lg h-8 w-8 p-1 shadow-inner hover:shadow-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{
                  fill: "rgb(255, 255, 255)",
                  "--darkreader-inline-fill": "#ffffff",
                }}
                data-darkreader-inline-fill=""
                onClick={() => {
                  navigator.clipboard
                    .writeText(formattedJson)
                    .then(() => {
                      toast.success("Formatted JSON copied to clipboard")
                    })
                    .catch((error) => {
                      toast.error("Failed to copy formatted JSON");
                    });
                }}
              >
                <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path>
              </svg>
            </div>
            <div className="flex h-5/6 overflow-auto scrollbar-thin scrollbar-thumb-slate-500">
              {/* <!-- Line Number --> */}
              <div className="w-8 h-full px-1">
                {Array.from(
                  { length: formattedJsonLineCount },
                  (_, index) => index + 1
                ).map((lineNumber) => (
                  <div key={lineNumber} className="text-sm text-color-1">
                    {lineNumber}
                  </div>
                ))}
              </div>
              {/* <!-- For pasting the json --> */}
              <TextArea jsonInput={formattedJson} handleInputChange={handleInputChange} readOnly={true} formatted={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONBeautifier;