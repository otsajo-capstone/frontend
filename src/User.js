import React, { useState } from 'react';



const User = () => {
  const [memberid, setMemId] = useState(0);
  const [logged, setLogged] = useState(false);
  //const [nickname, setNickname] = useState('');

  const onChangeMemId = e => {
    setMemId(e.target.value);
  };

  const onChangeLogged = e => {
    setLogged(e.target.value);
  };

  return (
    <div>
        
      <div>
        <input value={memberid} onChange={onChangeMemId} />
        <input value={logged} onChange={onChangeLogged} />
      </div>
      <div>
        <div>
          <b>id:</b> {memberid}
        </div>
      </div>
    </div>

  );
};

export default User;