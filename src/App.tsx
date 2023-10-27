import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";
import { useCallback } from "react";
import { ChangeEvent } from "react";
import debounce from "lodash.debounce";
function App() {
  //  바탕색이 바뀔 때 state에 저장을 하고 content.ts로 메세지를 보내줌
  const onBackgroundChange = (color: string) => {
    setBackgroundColor(color);
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id || 0, color as string);
        }
      );
  };

  // 배경화면 색깔이 바뀌면 익스텐션 배경도 바뀌게
  const [selectedBackgroundColor, setBackgroundColor] =
    useState<string>("rgb(65, 61, 61)");

  const debounceSetBackgroundColor = useCallback(
    debounce(onBackgroundChange, 250),
    []
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounceSetBackgroundColor(e.target.value);
  };

  return (
    <div className="App" style={{ backgroundColor: selectedBackgroundColor }}>
      <div>
        <input type="color" onChange={onChange} />
        <label>{selectedBackgroundColor}</label>
      </div>
    </div>
  );
}

export default App;
