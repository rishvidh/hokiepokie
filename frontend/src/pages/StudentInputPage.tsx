import React, { useState } from 'react';
import hokieBirdPattern from '../assets/hokie4k.png'; // Make sure to adjust the path based on where you place the image


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

        // Data to be sent to backend
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
        <div style={styles.pageContainer}>
            {/* Header Section */}
            <header style={styles.header}>
                {/* HokieSchedule Button on the Top Left */}
                <button style={styles.homeButton} onClick={() => window.location.href = '/'}>
                    HokieHand
                </button>
                <h1 style={styles.pageTitle}>Student Information</h1>
            </header>

            <div style={styles.contentContainer}>
                <div style={styles.container}>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Student Name:</label>
                            <input
                                type="text"
                                style={styles.input}
                                id="studentName"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Student ID:</label>
                            <input
                                type="text"
                                style={styles.input}
                                id="studentID"
                                value={studentID}
                                onChange={(e) => setStudentID(e.target.value)}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Upload Transcript:</label>
                            <input
                                type="file"
                                style={styles.fileInput}
                                id="transcript"
                                accept=".pdf,.docx"
                                onChange={(e) => setTranscript(e.target.files ? e.target.files[0] : null)}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Upload Other Relevant Files (optional):</label>
                            <input
                                type="file"
                                id="otherFiles"
                                style={styles.fileInput}
                                multiple
                                onChange={(e) => setOtherFiles(e.target.files)}
                            />
                        </div>

                        <button
                            style={styles.submitButton}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            {/*Footer Section */}
            <footer style={styles.footer}>
                <p>
                    Contact us at <a href="mailto:info@vt.edu" style={styles.footerLink}>info@vt.edu</a> | Privacy Policy
                </p>
            </footer>
        </div>
    );
};

// Styles with dark page background and VT color theme
const styles: { [key: string]: React.CSSProperties } = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#131212',
        backgroundImage: `url(${hokieBirdPattern})`, // Use the uploaded pattern
        backgroundSize: 'cover', // Adjust size as needed
        backgroundRepeat: 'repeat',
        backgroundPosition: '45deg', // Diagonal orientation
    },
    header: {
        width: '100%',                          
        padding: '1.5rem',
        textAlign: 'center',
        height: '80px',
        background: 'linear-gradient(90deg, #6A2C3E, #CF4520)',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: 0, // Ensures header is at the top
    },
    homeButton: {
        position: 'absolute',
        left: '1.5rem',
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        border: 'none',
        fontSize: '2rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: 'none', // No underline
    },
    pageTitle: {
        color: '#FFFFFF', // White color for the title
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: 0,
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        width: '100%',
        padding: '20px',
    },
    container: {
        maxWidth: '600px',
        width: '90%',
        padding: '20px',
        backgroundColor: '#6A2C3E', // VT color for the content box
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: '15px',
        textAlign: 'left', // Aligns input group labels and fields to the left
    },
    label: {
        display: 'block',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: '#CF4520', // VT color for labels to match highlighted text
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #CF4520', // VT color for input border
        backgroundColor: '#292929',
        color: 'white',
    },
    fileInput: {
        padding: '5px',
        color: '#FFFFFF',
    },
    submitButton: {
        display: 'block',
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        backgroundColor: '#CF4520', // VT color for button
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease', // Add transform transition for smooth scaling
    },
    footer: {
        width: '100%',
        padding: '1.5rem',
        textAlign: 'center',
        background: 'linear-gradient(90deg, #6A2C3E, #CF4520)',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: 0, 
        fontWeight: 'bold',
        color: 'white'
    },
    footerLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: 'bold'
    },
};

// Adding the pulse animation for hover
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  button:hover {
    animation: pulse 1s infinite; /* Apply pulse animation only on hover */
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;
document.head.appendChild(styleSheet);

export default StudentInputPage;



