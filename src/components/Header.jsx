import chef from '../images/chef-cue-icon.png'
export default function Header(){
    return(
        <header className="header">
          
            <img src={chef} alt="Chef Cue Icon" />
            <h1>Chef Cue</h1>
          
        </header>
        
    )
}