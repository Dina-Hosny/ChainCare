import React from "react";
import styled from "styled-components";
import { AiOutlineDownload } from "react-icons/ai";

const DownloadButton = styled.button`
  align-items: center;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #4c58cc;
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;

  &:hover,
  &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(0, 0, 0, 0.65);
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: #f0f0f1;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }
`;

const Select = styled.select`
  /* margin: 20px; */
  border: none;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
`;

const FileDownloadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 10px 0;
`;

export default class DownloadIdentity extends React.Component {
  constructor(props) {
    super(props);

    const defaultFileType = "json";
    this.fileNames = {
      json: "identityInfo.json",
      csv: "identityInfo.csv",
      text: "identityInfo.txt",
    };
    this.state = {
      fileType: defaultFileType,
      fileDownloadUrl: null,
      status: "",
      data: [
        {
          publicKey: props.pubK,
          privateKey: props.priK,
          symmetricKey: props.symmK,
        },
      ],
    };
    this.changeFileType = this.changeFileType.bind(this);
    this.download = this.download.bind(this);
  }

  changeFileType(event) {
    const value = event.target.value;
    this.setState({ fileType: value });
  }

  download(event) {
    event.preventDefault();
    // Prepare the file
    let output;
    if (this.state.fileType === "json") {
      output = JSON.stringify({ states: this.state.data }, null, 4);
    } else if (this.state.fileType === "csv") {
      // Prepare data:
      let contents = [];
      contents.push(["publicKey", "privateKey", "symmetricKey"]);
      this.state.data.forEach((row) => {
        contents.push([row.publicKey, row.privateKey, row.symmetricKey]);
      });
      output = this.makeCSV(contents);
    } else if (this.state.fileType === "text") {
      // Prepare data:
      output = "";
      this.state.data.forEach((row) => {
        output += `Public Key: ${row.publicKey}\nPrivate Key: ${row.privateKey}\nSymmetric Key: ${row.symmetricKey}`;
      });
    }
    // Download it
    const blob = new Blob([output]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    this.setState({ fileDownloadUrl: fileDownloadUrl }, () => {
      this.dofileDownload.click();
      URL.revokeObjectURL(fileDownloadUrl); // free up storage--no longer needed.
      this.setState({ fileDownloadUrl: "" });
    });

    this.props.callback(true);
  }

  /**
   * Function returns the content as a CSV string
   * See https://stackoverflow.com/a/20623188/64904
   * Parameter content:
   *   [
   *.     [header1, header2],
   *.     [data1, data2]
   *.     ...
   *.  ]
   * NB Does not support Date items
   */
  makeCSV(content) {
    let csv = "";
    content.forEach((value) => {
      value.forEach((item, i) => {
        let innerValue = item === null ? "" : item.toString();
        let result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) {
          result = '"' + result + '"';
        }
        if (i > 0) {
          csv += ",";
        }
        csv += result;
      });
      csv += "\n";
    });
    return csv;
  }

  /**
   * Process the file within the React app. We're NOT uploading it to the server!
   */
  openFile(evt) {
    let status = []; // Status output
    const fileObj = evt.target.files[0];
    const reader = new FileReader();

    let fileloaded = (e) => {
      // e.target.result is the file's content as text
      const fileContents = e.target.result;
      status.push(
        `File name: "${fileObj.name}". Length: ${fileContents.length} bytes.`
      );
      // Show first 80 characters of the file
      const first80char = fileContents.substring(0, 80);
      status.push(`First 80 characters of the file:\n${first80char}`);
      this.setState({ status: status.join("\n") });
    };

    // Mainline of the method
    fileloaded = fileloaded.bind(this);
    reader.onload = fileloaded;
    reader.readAsText(fileObj);
  }

  render() {
    return (
      <div>
        <form>
          <FileDownloadContainer>
            <span className="mr">File type:</span>
            <Select
              name="fileType"
              onChange={this.changeFileType}
              value={this.state.fileType}
              className="mr"
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="text">Text</option>
            </Select>

            <DownloadButton onClick={this.download}>
              <AiOutlineDownload /> Download
            </DownloadButton>
            {/* <button onClick={this.download}>Download the file!</button> */}

            <a
              className="hidden"
              download={this.fileNames[this.state.fileType]}
              href={this.state.fileDownloadUrl}
              ref={(e) => (this.dofileDownload = e)}
            />
          </FileDownloadContainer>
        </form>
        <pre className="status">{this.state.status}</pre>
      </div>
    );
  }
}
