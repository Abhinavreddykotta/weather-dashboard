const store = {};

export default {
  get(key){
    const e = store[key];
    if(!e) return null;
    if(Date.now() > e.expires) { delete store[key]; return null; }
    return e.value;
  },
  set(key, value, ttlSeconds=60){
    store[key] = { value, expires: Date.now() + ttlSeconds*1000 };
  }
};
