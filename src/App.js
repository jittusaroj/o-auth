import './App.css';
import { useState, useEffect } from 'react';

import { supabase } from './client';
function App() {
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [repos, setRepos] = useState([]);



  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', function() {
      checkUser();
    });
  }, [user])
  async function getRepo() {
    const response = await fetch(`https://api.github.com/users/{USERNAME}/repos`) ;
    console.log({ response })
  }
  async function checkUser() {
    const user = supabase.auth.user();
    console.log({ user })
    const response = await fetch(`https://api.github.com/users/${user?.user_metadata?.user_name}/repos`);
    const eventsResponse = await fetch(`https://api.github.com/users/${user?.user_metadata?.user_name}/events/public`);
    const result = await response.json();
    const events = await eventsResponse.json();
    setEvents(events)
    console.log({ events })
    setRepos(result)
    console.log({ result })
    setUser(user);
  }
  async function getActivity(repo) {
    const response = await fetch(`https://api.github.com/repos/${user?.user_metadata?.user_name}/${repo}/events`);
    const activities = await response.json();
    setActivities(activities)
    console.log({ activities })
  }
  async function signInWithGithub() {
    await supabase.auth.signIn({
      provider: 'github'
    });
  }
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }
  if (user) {
    return (
      <>
        <div className="container">
          <div className="d-flex">
            <img className='profile-pic' src={user?.user_metadata?.avatar_url} alt="" />
            <h1> &nbsp;Hello, {user?.user_metadata?.name} ( {user?.user_metadata?.user_name})</h1>
          </div> <br />
          <button className="btn btn-danger"  onClick={signOut}>Sign out</button>
          <div className="row">
            <div className="col-lg-6">
              <h2>Repository List</h2>
              <ul>
                {repos.length > 0 && repos.map((repo, index) => (
                  <li key={index} onClick={() => getActivity(repo.name)}>{repo.name}</li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <h2>Activity</h2>
              {activities.length==0 ? <p>No activity available for this repository</p>:''}
              <ul>
                {activities.length > 0 && activities.map((activity, index) => (
                  <li key={index}>
                    <div>
                      <img className='profile-pic' src={activity?.actor?.avatar_url} alt="" /> <span> &emsp;{activity?.actor?.display_login}</span>
                      <h4>{activity?.type}</h4>
                      <p>{activity?.payload?.comment?.body}</p>
                      {activity?.payload?.comment?.created_at ?  <small>{new Date(activity?.payload?.comment?.created_at).toDateString()}</small>:''}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </>
    )
  }
  return (
    <div className="App">
      <h1>Hello, please sign in!</h1>
      <button onClick={signInWithGithub} className="btn btn-primary">Sign In</button>
    </div>
  );
}

export default App;
