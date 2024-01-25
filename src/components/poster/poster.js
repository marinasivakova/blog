import './poster.css'
import { format } from 'date-fns'; 

const OriginalPoster = ({author,date}) => {
  let updateDate = format(date, 'MMMM,d,y');
    return (<div className="poster">
    <div>
        <div className="poster__name">{author.username}</div>
        <div className="poster__date">{updateDate}</div>
    </div>
    <img className="poster__img" alt="Poster's set profile"src={author.image}/>
  </div>)
}
export default OriginalPoster