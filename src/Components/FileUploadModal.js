import React, { useState } from "react";

const FileUploadModal = ({ setShowFileUploadModal, handleFileUpload }) => {
  const [highlighted, setHighlighted] = useState(false);
  const [file, setFile] = useState(null);

  const handleCloseUpload = () => {
    setFile(null);
    setShowFileUploadModal(false);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    // Do something with the selected file
    if (uploadedFile.type === "application/json") {
      setFile(uploadedFile);
    }
  };

  const handleImportFile = () => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        handleFileUpload(fileContent); // Store the raw content in state
      };

      reader.readAsText(file);
    } else {
      console.log("Invalid file format. Please drop a JSON file.");
    }

    handleCloseUpload()
  };

  return (
    // <!-- Main modal -->
    <div
      id="fileUploadModal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
    >
      <div className="relative left-1/3 max-h-full w-full max-w-2xl">
        {/* <!-- Modal content --> */}
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Upload File
            </h3>
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleCloseUpload}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="space-y-6 p-6">
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className={`dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 ${
                  highlighted
                    ? "border-solid border-yellow-400"
                    : "border-dashed border-gray-300"
                } bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDragEnter={() => {
                  setHighlighted(true);
                }}
                onDragLeave={() => {
                  setHighlighted(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setHighlighted(false);
                  const uploadedFile = Array.from(e.dataTransfer.files).filter(
                    (file) => file.type === "application/json"
                  )[0];
                  setFile(uploadedFile);
                }}
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    aria-hidden="true"
                    className="mb-3 h-10 w-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      {file ? file.name : "Click to upload"}
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    .json (MAX. 50MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
            <button
              type="button"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleImportFile}
            >
              Import
            </button>
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              onClick={handleCloseUpload}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
