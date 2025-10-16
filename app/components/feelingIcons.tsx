"use client"

// MUI
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import CrueltyFreeIcon from '@mui/icons-material/CrueltyFree';

type Props = {
  index: string
}

const FeelingIcons = ({index}:Props) => {

  // MUIアイコン配列
  const muiIcons = [TagFacesIcon, SentimentSatisfiedAltIcon, SentimentSatisfiedIcon, SentimentDissatisfiedIcon, MoodBadIcon]
  // アイコンの色
  const color = ["#FF6347", "#FFA500", "#FFD700", "#90EE90", "#87CEFA" ];

  const iconIndex = Number(index) - 1;
  const ThisFeeling:React.ElementType = muiIcons[iconIndex];
  // indexが不正な場合はデフォルトアイコンを使う
  const SafeFeeling = ThisFeeling || CrueltyFreeIcon;

  const ThisColor = color[iconIndex];
  // indexが不正な場合はデフォルトカラーを使う
  const SafeColor = ThisColor || "lightPink";

  return (
    <div className='feelingIcon'>
      <SafeFeeling
        sx={{
          color:  SafeColor,
          fontSize: "32px"
        }}
      />
    </div>
  )
}

export default FeelingIcons
