import React,{Component} from 'react'
import styled from 'styled-components';
import {FolderOpen} from 'styled-icons/fa-regular/FolderOpen'
import { Progress } from 'reactstrap';
import './Sidebar.css'
import axios from 'axios';

const Container = styled.div`
    display : flex;
    flex-direction : column;
`
const Item = styled.div`
    width : 300px
    height : 80px
    background-color : #ffffff;
    font-family : Verdana
    border-bottom : 0.5px solid #dfdfdf;
`
const FolderIcon = FolderOpen.extend`
    width : 25px;
    height : 25px;
    color : #5bc2e1;
    margin-bottom : 5px
    margin-left : 20px
`

const Head = styled.div`
    padding-top : 10px
    font-size : 20px
`
const HeadContainer = styled.div`
    width : 300px
    height : 50px
    background-color : #ffffff;
    font-family : Verdana
    border-bottom : 0.5px solid #dfdfdf;
`
const ItemContainer = styled.div`
    width : 300px
    height : 618px;
    background-color : #ffffff;
    font-family : Verdana
    border-bottom : 0.5px solid #dfdfdf;
`
const Projectname = styled.div`
    margin-left: 20px;
    padding-top: 15px;
    padding-bottom: 5px;
`
const Pm = styled.div`
    border: 2px solid #5bc2e1;
    border-radius: 10px;
    font-size : 10px;
    display:inline-block;
    width: 25%;
    height: 15px;
    text-align: center;
    line-height: 1;
`
const ProgressContainer = styled.div`
    width: 250px;
    margin-left: 22px;
`
// const Percent = styled.div`
//     border-radius: 10px;
//     background-color : #e8e8e8
//     font-size : 10px;
//     display:inline-block;
//     width : 250px
//     height : 12px
//     margin-top : 10px
//     margin-left : 20px
//     padding: 5px;

// `
// const PercentIndiv = styled.div`
//     border-radius: 10px;
//     background-color : red
//     font-size : 10px;
//     display:inline-block;
//     width : 200px
//     margin-top : 10px
//     margin-left : 20px
//     padding: 5px;
// `
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {projects : []}
    }
    componentDidMount() {
        axios.get(`http://dev.pirsquare.net:3013/traffic-api/project`)
          .then( res => {
            const { data } = res
            console.log('Data', data)
            this.setState({ projects: data });
          })
      }

    render() {
        return (
            <Container>
                <HeadContainer><Head><FolderIcon />&emsp;Project</Head></HeadContainer>
                <ItemContainer>
                {this.state.projects.map((project) => {
                        return (
                        <div>
                            <Item>
                            <Projectname>{project.name}&ensp;{project.ProjectsManagement.map((pm) => { return (<Pm>{pm.Users.name}</Pm>)})}</Projectname>
                            <ProgressContainer><Progress animated color="success" value="10"/></ProgressContainer>
                            </Item>
                              
                        </div>
                        
                        )})}
                </ItemContainer>
            </Container>
        );
    }
}

export default Sidebar;