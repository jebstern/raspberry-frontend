import React, { useEffect, useState } from 'react'
import './App.css'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { tags } from './api'
import { Ruuvitag } from './types'
import { timestamp } from './utils'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardActionArea,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Container,
} from '@material-ui/core'
import WbSunny from '@material-ui/icons/WbSunny'
import Schedule from '@material-ui/icons/Schedule'
import Opacity from '@material-ui/icons/Opacity'
import WhatsApp from '@material-ui/icons/WhatsApp'
import FilterDrama from '@material-ui/icons/FilterDrama'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 44,
    },
    title: {
      marginBottom: 44,
    },
    container: {
      marginTop: '5rem',
      padding: 24,
    },
    card: {},
  })
)

const App = () => {
  const classes = useStyles()
  const [ruuviTags, setRuuviTags] = useState<Ruuvitag[]>([])

  useEffect(() => {
    getTagData()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => getTagData(), 2000)
    return () => clearInterval(timer)
  })

  const getTagData = () => {
    tags().then((res) => {
      console.log(res)
      setRuuviTags(res)
    })
  }

  const getTagInfo = (tag: Ruuvitag, imageUrl: string) => {
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={window.location.origin + imageUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {tag.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            ></Typography>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem>
                <ListItemIcon>
                  <WbSunny />
                </ListItemIcon>
                <ListItemText primary={tag.temperature + ' °C'} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Opacity />
                </ListItemIcon>
                <ListItemText
                  primary={Number(tag.humidity).toFixed(2) + ' %'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FilterDrama />
                </ListItemIcon>
                <ListItemText
                  primary={Number(tag.pressure / 100000).toFixed(4) + ' hPa'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Schedule />
                </ListItemIcon>
                <ListItemText primary={timestamp(tag.timestamp)} />
              </ListItem>
            </List>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small">
            <WhatsApp />{' '}
            <a
              href="whatsapp://send?text=The text to share!"
              data-action="share/whatsapp/share"
            >
              Share
            </a>
          </Button>
        </CardActions>
      </Card>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="lg" className={classes.root}>
        <Typography variant="h2" component="h2" className={classes.title}>
          ÄLYKOTI
        </Typography>
        {ruuviTags.length === 0 && (
          <Typography component="p">No data available from server!</Typography>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            {(ruuviTags.length > 0 && ruuviTags[0] !== null) && getTagInfo(ruuviTags[0], '/balcony.jpeg')}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            {(ruuviTags.length > 1 && ruuviTags[1] !== null) &&
              getTagInfo(ruuviTags[1], '/livingroom.jpg')}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            {(ruuviTags.length > 2 && ruuviTags[2] !== null) && getTagInfo(ruuviTags[2], '/sauna.jpg')}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default App
