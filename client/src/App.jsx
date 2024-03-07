
import './App.css';
import Header from './Header';
import Post from './Post';
import { Routes,Route } from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import Registerpage from './pages/Registerpage';
import Indexpage from './pages/Indexpage';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';

function App() {
  

  return (
    <UserContextProvider>
      <Routes >
        <Route path={'/'} element={<Layout/>}>
        <Route index element ={<Indexpage/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/create'} element={<CreatePost/>}/>
        <Route path={'/register'} element={<Registerpage/>}/>
        <Route path={'/post/:id'} element={<PostPage/>}/>
        <Route path={"/edit/:id"} element={<EditPost/>} />
        </Route>
      </Routes>

    </UserContextProvider>
   
      

      
      
    
  );

}

export default App;
