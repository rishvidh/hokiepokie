
// Import necessary libraries and hooks
import React, { useState } from 'react';

const StudentInputPage: React.FC = () => {
    const [studentName, setStudentName] = useState<string>('');
    const [studentID, setStudentID] = useState<string>('');
    const [transcript, setTranscript] = useState<File | null>(null);
    const [otherFiles, setOtherFiles] = useState<FileList | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!transcript) {
            alert("Please upload a transcript!");
            return;
        }

        // data to be sent to backend
        const formData = new FormData();
        formData.append('studentName', studentName);
        formData.append('studentID', studentID);
        formData.append('transcript', transcript);

        if (otherFiles) {
            for (let i = 0; i < otherFiles.length; i++) {
                formData.append('otherFiles', otherFiles[i]);
            }
        }

        fetch('/api/upload-student-data', {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                if (response.ok) {
                    alert("Student data uploaded successfully!");
                } else {
                    alert("Failed to upload student data");
                }
            })
            .catch((error) => {
                console.error('Error uploading data:', error);
            });
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Upload Student Information</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="studentName">Student Name:</label>
                    <input
                        type="text"
                        id="studentName"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="studentID">Student ID:</label>
                    <input
                        type="text"
                        id="studentID"
                        value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="transcript">Upload Transcript:</label>
                    <input
                        type="file"
                        id="transcript"
                        accept=".pdf,.docx"
                        onChange={(e) => setTranscript(e.target.files ? e.target.files[0] : null)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="otherFiles">Upload Other Relevant Files (optional):</label>
                    <input
                        type="file"
                        id="otherFiles"
                        multiple
                        onChange={(e) => setOtherFiles(e.target.files)}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default StudentInputPage;
