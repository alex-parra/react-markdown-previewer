import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";

import "./styles.scss";

/*
 * Configs -------------------------
 */

const editorDefault = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
----------- | ------------ | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

marked.setOptions({ breaks: true });
const renderer = new marked.Renderer();
renderer.link = (href, title, text) =>
  `<a href="${href}" target="_blank">${text}</a>`;

/*
 * Components -------------------------
 */

const Editor = ({ value, onChange }) => {
  return (
    <textarea
      id="editor"
      value={value}
      onChange={ev => onChange(ev.target.value)}
    />
  );
}; // Editor

const Preview = ({ value }) => {
  const parsed = { __html: marked(value, { renderer }) };
  return <div id="preview" dangerouslySetInnerHTML={parsed} />;
}; // Preview

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: editorDefault
    };
  }

  handleTextChange = value => {
    this.setState({ source: value });
  };

  render() {
    const { source } = this.state;
    return (
      <div className="chrome">
        <div className="editorWrap">
          <Editor value={source} onChange={this.handleTextChange} />
        </div>
        <div className="previewWrap">
          <Preview value={source} />
        </div>
      </div>
    );
  }
} // class App

ReactDOM.render(<App />, document.getElementById("app"));
