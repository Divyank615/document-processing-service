# Reflection

## My Approach

I started by understanding the problem and listing the required API endpoints.
After that, I designed a simple structure to keep the code clean and easy to understand.

I separated the code into controllers, services, repositories, and processors so that each part has a clear responsibility.


## Design Decisions

I used a clean architecture approach:
- Controllers handle API requests.
- Services contain the main logic.
- A queue service handles background processing.
- A processor service simulates document processing.
- An in-memory repository stores documents.


## Asynchronous Processing

Document processing is done asynchronously using a custom queue.
This ensures that the API responds quickly while processing continues in the background.

## Error Handling and Validation

I added validation middleware to check required fields and base64 content.
If any error occurs during processing, the document status is marked as `failed` instead of crashing the server and we can also make more of these to add if required .

## Challenges

The main challenge for me was handling asynchronous processing and setting up testing with Jest and TypeScript.
I learned how to debug and fix issues related to async tasks and tooling configuration.

## Use of AI Tools

I used AI tools to understand concepts, debug errors, and verify my implementation.
All final coding and design decisions were made by me after understanding the suggestions.

## What I Would Improve with More Time

- Add database storage instead of in-memory storage.
- Implement automatic retry for failed processing.
- Add pagination for listing documents.
- Perform real document parsing for PDF and CSV files.

## Conclusion

This project helped me learn about backend architecture, asynchronous processing, and API design using TypeScript and Node.js.
