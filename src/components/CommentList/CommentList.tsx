import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
//import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, useTheme } from '@mui/material';
import { CommentResponse } from '../../api';
import { AppContext } from '../../context/context';
import CloseIcon from '@mui/icons-material/Close';
import useTodos from '../../hooks/useTodos';

interface Props {
    children?: React.ReactNode;
    comments: CommentResponse[];
    onDelete : (id:string)=>void;
}

const CommentList = (props: Props) => {

    const {comments, onDelete} = props;

    const theme = useTheme();
    const {accountState} = React.useContext(AppContext);

    return (
      <List
        sx={{
          width: "100%",
          minWidth: 360,
          height:"fit-content",
          bgcolor: "background.paper",
        }}
      >
        {
            comments.map((comment)=>{
                return(
                    <Box
                        key={comment.id}
                        sx={{position: 'relative'}}
                    >
                        {
                            comment.account_id === accountState.id &&
                            <CloseIcon
                                sx={{
                                    color: theme.palette.error.main,
                                    fontSize: '1em',
                                    cursor:'pointer',
                                    position:'absolute',
                                    top:'0.5em',
                                    right:'0.5em',
                                    zIndex:'1000',
                                }}
                                onClick={()=>{onDelete(comment.id ?? '')}}
                            ></CloseIcon>
                        }
                        <ListItem 
                            alignItems="flex-start"
                            disablePadding
                            divider={false}
                            dense={false}
                        >
                        <ListItemAvatar>
                            <Avatar alt={comment.account_username} src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            //primary="Brunch this weekend?"
                            sx={{
                                borderRadius:'8px',
                                padding: '0.4em 0.6em',
                                background: theme.palette.grey[100]
                            }}
                            secondary={
                            <React.Fragment>
                                <Typography
                                component="span"
                                variant="subtitle2"
                                sx={{ color: "text.primary", display: "block" }}
                                >
                                {comment.account_username}
                                </Typography>

                                <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: "text.secondary", display: "block" }}
                                >
                                    {comment.content}
                                </Typography>
                            </React.Fragment>
                            }
                        />
                        </ListItem>
                    
                    </Box>
                )
            })
        }
        
      </List>
    );
}

export default CommentList