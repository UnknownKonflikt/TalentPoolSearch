/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import type Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {

  // State to hold the array of candidates going in local storage
  const [potentialCandidates, setCandidates] = useState<Candidate[]>([]); 

  // Function to fetch candidates from local storage
  const fetchCandidatesFromLocalStorage = () => {
    
    const storedCandidates = JSON.parse(localStorage.getItem('potentialCandidates') ?? '[]');

    // Set the candidates state
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setCandidates(storedCandidates); 
  };

  // function to delete candidate 
  const deleteCandidateFromLocalStorage = (username: string) => {
    const updatedCandidates = potentialCandidates.filter(candidate => candidate.login !== username);
    // update the react state which update UI
    setCandidates(updatedCandidates);

    // Update the local storage with the modified array
    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
  }

  // Fetch candidates when the component mounts
  useEffect(() => {
    fetchCandidatesFromLocalStorage();
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      {/* Candidates table */}
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {/* map each candidate as a row in the table */}
          {potentialCandidates.map((candidate, index) => (
            // tell react the key that is being updated
            <tr key={index}>
              <td>
                <img src={candidate.avatar_url??''} alt={`${candidate.name} avatar`} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{candidate.name}</td>
              <td>{candidate.login}</td>
              <td>{candidate.location ?? 'N/A'}</td>
              <td>
                <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
              </td>
              <td>{candidate.company ?? 'N/A'}</td>
              <td>{candidate.bio ?? 'N/A'}</td>
              <td>
                {/* add onClick event handler  */}
                <button className='delete-button' onClick={() => deleteCandidateFromLocalStorage(candidate.login)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;