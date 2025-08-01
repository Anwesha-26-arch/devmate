import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Form, Badge, Row, Col } from "react-bootstrap";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { ThemeContext } from "./ThemeContext";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import html from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java";
import c from "react-syntax-highlighter/dist/esm/languages/hljs/c";
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";
import php from "react-syntax-highlighter/dist/esm/languages/hljs/php";
import { github, atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("php", php);

const CodeSnippetSaver = () => {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [filterTag, setFilterTag] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const { theme } = useContext(ThemeContext);

  const snippetRef = collection(db, "snippets");

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    const data = await getDocs(snippetRef);
    setSnippets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleAddOrUpdate = async () => {
    if (!title.trim() || !code.trim()) return;
    const snippetData = {
      title,
      code,
      language,
      tags: tags.split(",").map((t) => t.trim()),
    };

    if (editId) {
      const docRef = doc(db, "snippets", editId);
      await updateDoc(docRef, snippetData);
      setEditId(null);
    } else {
      await addDoc(snippetRef, snippetData);
    }

    setTitle("");
    setCode("");
    setTags("");
    setLanguage("javascript");
    fetchSnippets();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "snippets", id));
    fetchSnippets();
  };

  const handleEdit = (snippet) => {
    setEditId(snippet.id);
    setTitle(snippet.title);
    setCode(snippet.code);
    setTags(snippet.tags.join(", "));
    setLanguage(snippet.language);
  };

  const filteredSnippets = snippets.filter((s) => {
    return (
      (!filterTag || s.tags.includes(filterTag)) &&
      (!search || s.title.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <Card className="mb-4" style={{ background: theme === "dark" ? "#1c1c1c" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}>
      <Card.Body>
        <Card.Title>💾 Code Snippet Saver</Card.Title>

        <Row className="mb-2">
          <Col md={6}>
            <Form.Control
              placeholder="Snippet Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={theme === "dark" ? "bg-dark text-white" : ""}
            />
          </Col>
          <Col md={6}>
            <Form.Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={theme === "dark" ? "bg-dark text-white" : ""}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="php">PHP</option>
            </Form.Select>
          </Col>
        </Row>

        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Enter code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={`mb-2 ${theme === "dark" ? "bg-dark text-white" : ""}`}
        />

        <Form.Control
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className={`mb-2 ${theme === "dark" ? "bg-dark text-white" : ""}`}
        />

        <Button onClick={handleAddOrUpdate} className="mb-3">
          {editId ? "Update Snippet" : "Add Snippet"}
        </Button>

        <Form.Control
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`mb-3 ${theme === "dark" ? "bg-dark text-white" : ""}`}
        />

        {snippets.length > 0 && (
          <div className="mb-3">
            <strong>Filter by Tag:</strong>{" "}
            {[...new Set(snippets.flatMap((s) => s.tags))].map((tag) => (
              <Badge
                key={tag}
                bg={tag === filterTag ? "primary" : "secondary"}
                onClick={() => setFilterTag(tag === filterTag ? "" : tag)}
                className="me-2"
                style={{ cursor: "pointer" }}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {filteredSnippets.map((snippet) => (
          <Card key={snippet.id} className="mb-3">
            <Card.Body>
              <Card.Title>{snippet.title}</Card.Title>
              <SyntaxHighlighter
                language={snippet.language}
                style={theme === "dark" ? atomOneDark : github}
              >
                {snippet.code}
              </SyntaxHighlighter>
              <div className="mt-2">
                {snippet.tags.map((tag, idx) => (
                  <Badge key={idx} bg="info" className="me-1">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <Button
                variant="warning"
                size="sm"
                className="me-2 mt-2"
                onClick={() => handleEdit(snippet)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="mt-2"
                onClick={() => handleDelete(snippet.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Card.Body>
    </Card>
  );
};

export default CodeSnippetSaver;
