import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Question } from "../../features/models/Question";
import { Button, CardActions } from "@mui/material";
import { formatQuestionTime } from "../../utils/datetimeUtil";

export default function QuestionItem({
  question,
  author,
}: {
  question: Question;
  author: string;
}) {
  return (
    <Card sx={{ marginBottom: "16px" }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontWeight: "700", marginBottom: 0 }}
        >
          {author ? `${author}` : ""}
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", fontSize: "small" }}>
          {formatQuestionTime(question?.timestamp)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color="success" fullWidth>
          Show
        </Button>
      </CardActions>
    </Card>
  );
}

{
  /* <Typography variant="body1">
  Would you rather {question?.optionOne?.text} or{" "}
  {question?.optionTwo?.text}?
</Typography> */
}
