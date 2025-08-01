import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const GitHubRepos = ({ username = "Anwesha-26-arch" }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((data) => setRepos(data));
  }, [username]);

  return (
    <Card className="mb-4 shadow-sm border-0 rounded-4">
      <Card.Body>
        <Card.Title>GitHub Repositories</Card.Title>
        <ul className="mb-0">
          {repos.slice(0, 1).map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default GitHubRepos;