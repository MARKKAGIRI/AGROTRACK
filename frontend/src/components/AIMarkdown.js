import React from "react";
import { View } from "react-native";
import Markdown from "react-native-markdown-display";

const AIMarkdown = ({ content }) => {
  return (    
    <Markdown style={markdownStyles}>{content}</Markdown>
  );
};

const markdownStyles = {
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: "#1f2937",
  },

  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#15803d",
    marginBottom: 8,
    marginTop: 16,
  },

  heading2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#15803d",
    marginBottom: 8,
    marginTop: 16,
  },

  bullet_list: {
    marginVertical: 8,
  },

  list_item: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },

  bullet_list_icon: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 20,
    color: "#16a34a",
    marginTop: -2,
  },

  bullet_list_content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
    flex: 1,
  },

  strong: {
    fontWeight: "700",
    color: "#111827",
  },

  code_inline: {
    backgroundColor: "#f3f4f6",
    color: "#db2777",
    fontFamily: "monospace",
    borderRadius: 4,
    paddingHorizontal: 4,
  },

  fence: {
    backgroundColor: "#111827",
    color: "#f3f4f6",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
};

export default AIMarkdown;
