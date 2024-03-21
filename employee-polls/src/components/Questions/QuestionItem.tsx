import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function QuestionItem() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader>
        <Typography gutterBottom variant="h5" component="div">
          New Questions
        </Typography>
      </CardHeader>
      <CardContent></CardContent>
      <CardActions>
        <Button size="small">Show</Button>
      </CardActions>
    </Card>
  );
}
