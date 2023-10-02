import { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { Typography, CircularProgress, CardMedia, CardContent, Container,Card } from '@mui/material';
import Rating from '@mui/material/Rating';
// import axios from 'axios';
import { fetchShowDetails } from '../../Services/dataServices';


interface ShowDetails {
  name: string;
  image: {
    medium: string;
  };
  summary: string;
  rating: {
    average: number;
  }
  ended: number;
  premiered: number;
  network: {
    id: number;
    name: string;
    country: {
      code: string;
      name: string;
      timezone: any;
    }

  }
  schedule: {
    days: string;
    time: number;
  }
  status: any;
  type: any;
  genres: any;
  officialSite: string;
  runtime: number;
}

const Details = () => {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState<ShowDetails | null>(null);

  // useEffect(() => {
  //   const url = `https://api.tvmaze.com/shows/${showId}`;
  //   axios.get(url)
  //     .then((response) => setShowDetails(response.data))
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, [showId]);
  
  useEffect(() => {
    if (showId) {
      const showIdNumber = parseInt(showId, 10);

      if (!isNaN(showIdNumber)) {
        fetchShowDetails(showIdNumber)
          .then((data) => setShowDetails(data))
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    }
  }, [showId]);

  if (!showDetails) {
    return <CircularProgress />;
  }
  
  return (
      <Container style={{ marginTop: "173px",marginLeft:"96px" }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ marginBottom: "16px", marginLeft: "65px", color:" darkcyan",textShadow:"2px 7px 3px black",fontSize:"40px", fontFamily:"fantasy" }}>
        Details
        </Typography>
      <CardMedia component="img" alt={showDetails.name}  src={showDetails.image.medium} style={{width: "269px",marginTop: "27px",marginLeft: "58px"}}/>
      <CardContent style={{marginLeft:"341px",marginTop:"-355px"}}>
        <Typography variant="h4" component="div" style={{fontWeight:900}}>
          {showDetails.name}
        </Typography>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: showDetails.summary }} />
          
      </CardContent>
      <Card style={{borderRadius: 2,width: "438px",boxShadow: "0 2px 4px black",height:"325px",position:"fixed", marginLeft:"1180px",top:"290px"}}>
        <CardContent>
        <Typography variant="h4" component="div" style={{textAlign:"center", color:"blue",fontFamily:"auto", fontWeight:600}}>
          Show Info
          </Typography>
          <Typography variant="h6" component="div" style={{fontSize:"18px",marginTop:"20px"}}>
        <b>Network :</b> {showDetails.network.id},<Link to={showDetails.network.name}>{showDetails.network.name}</Link>,({showDetails.premiered} - {showDetails.ended})
          </Typography>
        <Typography variant="h6" component="div"  style={{fontSize:"18px"}}>
       <b> Schedule :</b> {showDetails.schedule.days} at {showDetails.schedule.time} ({showDetails.runtime}min)
          </Typography>
          <Typography variant="h6" component="div" style={{fontSize:"18px"}}>
         <b> Status :</b> {showDetails.status}
          </Typography>
          <Typography variant="h6" component="div" style={{fontSize:"18px"}}>
        <b>  Type :</b> {showDetails.type}
          </Typography>
          <Typography variant="h6" component="div" style={{fontSize:"18px"}}>
         <b> Genres :</b> {showDetails.genres.join(" | ")}
          </Typography>
          <Typography variant="h6" component="div" style={{fontSize:"18px"}}>
         <b> Official Site : </b><Link to={showDetails.officialSite}>{showDetails.officialSite}</Link>
        </Typography>
        <Rating name="customized-10" defaultValue={showDetails.rating.average} max={10} />
          <Typography style={{marginLeft:"254px",marginTop:"-31px"}}>( {showDetails.rating.average}K )</Typography>
          </CardContent>
      </Card>
</Container>
  );
};

export default Details;
