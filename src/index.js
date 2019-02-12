import React, { Component } from 'react'
import {
  BOLD,
  ITALIC,
  UNDERLINE,
  JUSTIFY_LEFT,
  JUSTIFY_CENTRE,
  JUSTIFY_RIGHT,
  INSERT_ORDERD_LIST,
  INSERT_UNORDERED_LIST,
  DELETE_INDENTATION,
  ADD_INDENTATION,
  QUOTE
} from './constants';

import './styles.css';

class SimpleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecolor: 'black',
      formatBlock: 'h1',
      fontSize: 4,
    };
  }

  componentDidMount() {
    const oDoc = document.getElementById("textBox");
    oDoc.focus();
  }

  setDocMode = (bToSource) => (event) => {
    let oContent;
    const oDoc = document.getElementById("textBox");
    if (oDoc !== null) {
      if (event.target.checked) {
        oContent = document.createTextNode(oDoc.innerHTML);
        oDoc.innerHTML = "";
        var oPre = document.createElement("pre");
        oDoc.contentEditable = false;
        oPre.id = "sourceText";
        oPre.contentEditable = true;
        oPre.appendChild(oContent);
        oDoc.appendChild(oPre);
        document.execCommand("defaultParagraphSeparator", false, "div");
      } else {
        if (document.all) {
          oDoc.innerHTML = oDoc.innerText;
        } else {
          oContent = document.createRange();
          oContent.selectNodeContents(oDoc.firstChild);
          oDoc.innerHTML = oContent.toString();
        }
        oDoc.contentEditable = true;
      }
      oDoc.focus();

    }
  }

  validateMode() {
    const oDoc = document.getElementById("textBox");
    if (!document.compForm.switchMode.checked) { return true; }
    alert("Uncheck \"Show HTML\".");
    oDoc.focus();
    return false;
  }

  formatDoc = (sCmd, controllerType) => (event) => {
    const oDoc = document.getElementById("textBox");
    document.execCommand(sCmd, false, event.target.value);
    if (controllerType === 'foreColorDropdown') {
      this.setState({
        forecolor: event.target.value
      })
    }
    if (controllerType === 'textFormatDropdown') {
      this.setState({
        formatBlock: event.target.value
      })
    }
    if (controllerType === 'fontSizeDropdown') {
      this.setState({
        fontSize: event.target.value
      })
    }
    oDoc.focus();
  }

  getDomObject() {
    const oDoc = document.getElementById("textBox");
    const obj = {
      dom: oDoc,
      text: oDoc.innerText,
      html: oDoc.innerHTML,
    }
    return obj;
  }

  send = () => {
    if (this.props.getTextObject) {
      this.props.getTextObject(this.getDomObject());
    }
  }

  inputChange = () => {
    if (this.props.getTextOnType) {
      this.props.getTextOnType(this.getDomObject());
    }
  }

  render() {
    return (
      <div className="container">
        <input type="hidden" name="myDoc" />
        <div id="toolBar1">
          <select onChange={this.formatDoc('formatblock', 'textFormatDropdown')} value={this.state.formatBlock}>
            <option value="h1">Title 1 &lt;h1&gt;</option>
            <option value="h2">Title 2 &lt;h2&gt;</option>
            <option value="h3">Title 3 &lt;h3&gt;</option>
            <option value="h4">Title 4 &lt;h4&gt;</option>
            <option value="h5">Title 5 &lt;h5&gt;</option>
            <option value="h6">Subtitle &lt;h6&gt;</option>
            <option value="p">Paragraph &lt;p&gt;</option>
            <option value="pre">Preformatted &lt;pre&gt;</option>
          </select>
          <select onChange={this.formatDoc('fontsize', 'fontSizeDropdown')} value={this.state.fontSize}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="7">8</option>
            <option value="7">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select onChange={this.formatDoc('forecolor', 'foreColorDropdown')} value={this.state.forecolor}>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="black">Black</option>
          </select>
        </div>
        <div id="toolBar2">
          <img alt="" className="intLink" title="Bold" onClick={this.formatDoc('bold')} src={BOLD} />
          <img alt="" className="intLink" title="Italic" onClick={this.formatDoc('italic')} src={ITALIC} />
          <img alt="" className="intLink" title="Underline" onClick={this.formatDoc('underline')} src={UNDERLINE} />
          <img alt="" className="intLink" title="Left align" onClick={this.formatDoc('justifyleft')} src={JUSTIFY_LEFT} />
          <img alt="" className="intLink" title="Center align" onClick={this.formatDoc('justifycenter')} src={JUSTIFY_CENTRE} />
          <img alt="" className="intLink" title="Right align" onClick={this.formatDoc('justifyright')} src={JUSTIFY_RIGHT} />
          <img alt="" className="intLink" title="Numbered list" onClick={this.formatDoc('insertorderedlist')} src={INSERT_ORDERD_LIST} />
          <img alt="" className="intLink" title="Dotted list" onClick={this.formatDoc('insertunorderedlist')} src={INSERT_UNORDERED_LIST} />
          <img alt="" className="intLink" title="Quote" onClick={this.formatDoc('formatblock', 'blockquote')} src={QUOTE} />
          <img alt="" className="intLink" title="Delete indentation" onClick={this.formatDoc('outdent')} src={DELETE_INDENTATION} />
          <img alt="" className="intLink" title="Add indentation" onClick={this.formatDoc('indent')} src={ADD_INDENTATION} />
        </div>
        <div id="textBox" contentEditable="true" onInput={this.inputChange}></div>
        {this.props.showHTML &&
          <p id="editMode">
            <input type="checkbox" name="switchMode" id="switchBox" onChange={this.setDocMode(true)} />
            <label htmlFor="switchBox">Show HTML</label>
          </p>
        }
        {this.props.getTextButton &&
          <p><input type="button" value="Send" onClick={this.send} /></p>
        }
      </div>
    );
  }
}

export default SimpleEditor;
