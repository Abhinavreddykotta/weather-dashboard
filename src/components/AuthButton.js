import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../slices/authSlice';

export default function AuthButton(){
  const dispatch = useDispatch();
  const user = useSelector(s => s.auth.user);

  useEffect(() => {
    const cid = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if(!cid) return;

    const existing = document.getElementById('google-identity-js');
    if(!existing){
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-identity-js';
      script.async = true;
      script.onload = () => initGsi();
      document.body.appendChild(script);
    } else {
      initGsi();
    }

    function initGsi(){
      if(!window.google || !window.google.accounts || !window.google.accounts.id) return;
      if(!user){
        window.google.accounts.id.initialize({
          client_id: cid,
          callback: handleCredentialResponse,
        });
        const container = document.getElementById('gsi-button-container');
        if(container) {
          container.innerHTML = '';
          window.google.accounts.id.renderButton(container, { theme: 'outline', size: 'medium' });
        }
      }
    }

    function handleCredentialResponse(response){
      try{
        const jwt = response.credential;
        const payload = parseJwt(jwt);
        const profile = {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
        };
        dispatch(setUser(profile));
      }catch(e){
        console.error('GSI parse error', e);
      }
    }

    function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    }

  }, [dispatch, user]);

  const handleSignOut = () => {
    dispatch(clearUser());
    if(window.google && window.google.accounts && window.google.accounts.id){
      try{ window.google.accounts.id.disableAutoSelect(); }catch(e){}
    }
  };

  return (
    <div style={{display:'flex', alignItems:'center', gap:8}}>
      {!user && <div id="gsi-button-container" aria-hidden="true" />}
      {user && (
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <img src={user.picture} alt={user.name} style={{width:36,height:36,borderRadius:18}} />
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
            <div style={{fontSize:13,fontWeight:600}}>{user.name}</div>
            <div style={{fontSize:12,color:'#334155'}}>{user.email}</div>
          </div>
          <button onClick={handleSignOut} style={{marginLeft:8, padding:'6px 10px', borderRadius:8, border:'none', background:'#ef4444', color:'#fff', cursor:'pointer'}}>Sign out</button>
        </div>
      )}
    </div>
  );
}
