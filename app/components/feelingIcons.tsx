"use client"

// MUI
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';

type Props = {
  index: string
}

const FeelingIcons = ({index}:Props) => {

  // MUIアイコン配列
  const muiIcons = [TagFacesIcon, SentimentSatisfiedAltIcon, SentimentSatisfiedIcon, SentimentDissatisfiedIcon, MoodBadIcon]

  // アイコンの色
  const color = ["#FF6347", "#FFA500", "#FFD700", "#90EE90", "#87CEFA" ];

  const iconIndex = Number(index) - 1;
  const ThisFeeling = muiIcons[iconIndex];
  const ThisColor = color[iconIndex];
  return (
    <div className='feelingIcon'>
      <ThisFeeling
        sx={{
          color:  ThisColor,
          fontSize: "32px"
        }}
      />
    </div>
  )
}

export default FeelingIcons
