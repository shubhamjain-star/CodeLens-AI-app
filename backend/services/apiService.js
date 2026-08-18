import ai from "../config/apiConfig.js";

const reviewSchema = {
  type: "object",

  properties: {
    summary: {
      type: "string"
    },

    bugs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          severity: {
            type: "string",
            enum: ["low", "medium", "high", "critical"]
          },
          line: {
            type: "integer"
          }
        },
        required: [
          "title",
          "description",
          "severity",
          "line"
        ]
      }
    },

    complexity: {
      type: "object",
      properties: {
        time: {
          type: "string"
        },
        space: {
          type: "string"
        },
        explanation: {
          type: "string"
        }
      },
      required: [
        "time",
        "space",
        "explanation"
      ]
    },

    codeQuality: {
      type: "object",
      properties: {
        score: {
          type: "integer"
        },
        comments: {
          type: "array",
          items: {
            type: "string"
          }
        }
      },
      required: [
        "score",
        "comments"
      ]
    },

    securityIssues: {
      type: "array",
      items: {
        type: "string"
      }
    },

    suggestions: {
      type: "array",
      items: {
        type: "string"
      }
    },

    improvedCode: {
      type: "string"
    }
  },

  required: [
    "summary",
    "bugs",
    "complexity",
    "codeQuality",
    "securityIssues",
    "suggestions",
    "improvedCode"
  ]
};


export const reviewCode = async (code, language) => {

  const prompt = `
You are an expert software engineer and code reviewer.

Review the following ${language} code:

--- CODE START ---
${code}
--- CODE END ---

Analyze:

1. Bugs and logical errors
2. Time complexity
3. Space complexity
4. Code quality
5. Security issues
6. Improvements
7. Improved version of the code

For bugs:
- Give the exact issue.
- Explain why it is a problem.
- Give severity.
- Give line number if possible.
- If there are no bugs, return an empty array.

For security issues:
- Only report genuine security concerns.
- If none exist, return an empty array.

For code quality:
- Give a score from 1 to 10.
- Provide useful comments.

Do not invent problems or rewrite new code.
`;


  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: prompt,

    config: {
      responseMimeType: "application/json",
      responseJsonSchema: reviewSchema
    }
  });

  const result = JSON.parse(response.text);

  return result;
};