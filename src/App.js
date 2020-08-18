import React, {useState , useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards';
//import classes from '*.module.css';
import useStyles from './styles.js';

import wordsToNumbers from 'words-to-numbers';

const alanKey = 'ab8fbd62a4fd0a44042d9986329a03342e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () =>{

    const [newsArticles,setNewsArticles] = useState([]);
    const [activeArticle,setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand : ({command , articles , number}) =>{
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1); 
                }else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle +1);
                }else if(command === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy : true}) : number;
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20){
                        alanBtn().playText('Please enter valid article number.');
                    }else if(article){
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening..');
                    }

                    window.open(articles[number].url, '_blank');
                }
            }
        }) 
    } , [])

    return(
        <div>
            <div className={classes.logoContainer}>
                <img src="https://mycovidtracker.s3.ap-south-1.amazonaws.com/collage3.jpg" className = {classes.alanLogo} alt="logo" />
            </div>
            
            <NewsCards articles = {newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}

export default App;