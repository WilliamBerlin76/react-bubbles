import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log(colorToEdit)
  };

  const handleChangesName = e => {
    setColorToEdit({
      ...colorToEdit,
      color: e.target.value
    })
  }
  const handleChangesCode = e => {
    setColorToEdit({
      ...colorToEdit,
      code: {hex: e.target.value}
    })
  }
  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        const newList = colors.filter(entry => entry.id !== colorToEdit.id)
        console.log(res);
        updateColors([...newList, res.data])
      })
      .catch(err => {
        console.log('could not update', err)
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log(res)
        const newList = colors.filter(entry => entry.id !== color.id)
        updateColors([...newList])
      })
    .catch(err => {
      console.log('could not delete', err)
      console.log(colors)
    })
  };

const addColor = e => {
  e.preventDefault()
  axiosWithAuth()
    .post('http://localhost:5000/api/colors/', colorToEdit)
    .then(res => {
      console.log(res)
      
      updateColors(res.data)
    })
    .catch(err => {
      console.log('could not add color', err)
    })
}
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={(e) => {editColor(color)}}>
            <span>
              <span className="delete" onClick={() => {deleteColor(color)}}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <h3>Add Color</h3>
      <form>
        <input
          placeholder='color name'
          type='text'
          name='color'
          value={colorToEdit.color}
          onChange={handleChangesName}
        />
        <input
          placeholder='hex code'
          type='text'
          name='code'
          value={colorToEdit.code.hex}
          onChange={handleChangesCode}
        />
        <button onClick={addColor}>add color</button>
      </form>
    </div>
  );
};

export default ColorList;
