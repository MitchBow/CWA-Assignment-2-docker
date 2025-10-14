'use client';

import React from 'react';

const ApiAuthDocumentation: React.FC = () => {
  const baseUrl = 'http://ec2-13-220-91-34.compute-1.amazonaws.com:4080';

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Authentication API Documentation</h1>
      <p>
        This page documents the <strong>Register</strong> and <strong>Login</strong> API endpoints
        for the authentication system hosted on{' '}
        <code>{baseUrl}</code>.
      </p>

      <h3>1. Register a New User</h3>
      <p>Use this endpoint to create a new account.</p>
      <pre>
        <code>{`
curl -X POST ${baseUrl}/api/register \\
-H "Content-Type: application/json" \\
-d '{
  "username": "freshuser1234",
  "password": "superpass"
}'
        `}</code>
      </pre>

      <p><strong>PowerShell Equivalent:</strong></p>
      <pre>
        <code>{`
Invoke-RestMethod -Uri "${baseUrl}/api/register" -Method Post -ContentType "application/json" -Body '{
  "username": "freshuser1234",
  "password": "superpass"
}'
        `}</code>
      </pre>

      <h3>2. Login</h3>
      <p>Use this endpoint to log in with existing credentials.</p>
      <pre>
        <code>{`
curl -X POST ${baseUrl}/api/login \\
-H "Content-Type: application/json" \\
-d '{
  "username": "freshuser123",
  "password": "superpass"
}'
        `}</code>
      </pre>

      <p><strong>PowerShell Equivalent:</strong></p>
      <pre>
        <code>{`
Invoke-RestMethod -Uri "${baseUrl}/api/login" -Method Post -ContentType "application/json" -Body '{
  "username": "freshuser123",
  "password": "superpass"
}'
        `}</code>
      </pre>

      <h3>Responses</h3>
      <ul>
        <li><strong>201 Created</strong> – User successfully registered.</li>
        <li><strong>200 OK</strong> – Login successful (may include a token).</li>
        <li><strong>400 Bad Request</strong> – Invalid input or existing username.</li>
        <li><strong>401 Unauthorized</strong> – Invalid credentials on login.</li>
      </ul>

      <p>All responses are returned as JSON objects.</p>
    </div>
  );
};

export default ApiAuthDocumentation;
