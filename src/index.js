import React from "react";
import ReactDOM from "react-dom";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
//import "./styles.css";

/*Working with https://github.com/nadbm/react-datasheet */

const InputGridHeaders = [
  "Street Address",
  "City",
  "State",
  "Zip",
  "Budgeted EE's"
];
const InputGridLayout = { x: 6, y: 10 };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: Array.from({ length: InputGridLayout.y }, () =>
        new Array(InputGridLayout.x).fill({ value: 1 })
      )
    };
  }

  onContextMenu = e => {
    e.preventDefault();
    console.log("Show right-click menu options here: " + e.pageX, e.pageY);
  };

  onCellsChanged = changes => {
    // console.log(changes);
    const grid = this.state.grid.map(row => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
    });
    this.setState({ grid: grid });
  };

  render() {
    return (
      <div className="App">
        <h1>Can we spreadsheet?</h1>

        <ReactDataSheet
          data={this.state.grid}
          readOnly
          valueRenderer={cell => cell.value}
          onCellsChanged={e => this.onCellsChanged(e)}
          onContextMenu={e => this.onContextMenu(e)}
          sheetRenderer={props => (
            <table
              className={props.className + " my-awesome-extra-class"}
              style={{ width: "1000px" }}
            >
              <thead>
                <tr>
                  <th className="action-cell" />
                  {InputGridHeaders.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{props.children}</tbody>
            </table>
          )}
        />
        <h3>Yes we can!</h3>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
