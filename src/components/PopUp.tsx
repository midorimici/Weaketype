import React from 'react';

export default ({ onClick }: { onClick: () => void }) => {
  return (
    <div id="popup" hidden onClick={onClick}>
      <div className="shadow" style={{ top: 0, left: 0 }}></div>
      <div className="shadow" style={{ top: 0 }}></div>
      <div className="shadow"></div>
      <div className="shadow" style={{ left: 0 }}></div>
      <div id="light"></div>
    </div>
  );
};
