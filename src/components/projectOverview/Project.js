import React,{Component} from 'react'
import styled from 'styled-components';
import {FolderOpen} from 'styled-icons/fa-regular/FolderOpen'

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
    margin-top : 11px
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
    height : 1381px
    background-color : #ffffff;
    font-family : Verdana
    border-bottom : 0.5px solid #dfdfdf;
`
const Projectname = styled.div`
    margin-left : 20px
`
const Pm = styled.div`
    border : 2px solid #5bc2e1;
    border-radius: 10px;
    font-size : 10px;
    display:inline-block;
    width : 25%
    text-align: center;
    margin-top : 15px
    margin-right : 5px
`

const Percent = styled.div`
    border-radius: 10px;
    background-color : #e8e8e8
    font-size : 10px;
    display:inline-block;
    width : 250px
    height : 12px
    margin-top : 10px
    margin-left : 20px
    padding: 5px;
    position : absolute
`
const PercentIndiv = styled.div`
    border-radius: 10px;
    background-color : red
    font-size : 10px;
    display:inline-block;
    width : 200px
    margin-top : 10px
    margin-left : 20px
    padding: 5px;
    position : absolute
`
class Project extends Component {
    constructor() {
        super();
        this.state = {project : [{name : 'K my Funds', pm : ['pang']},{name : 'After Klass', pm : ['b','c']}]} //arrayofjson
    }
    render() {
        return (
            <Container>
                <HeadContainer><Head><FolderIcon />&emsp;Project</Head></HeadContainer>
                <ItemContainer>
                {this.state.project.map((project) => {
                        return (
                        <div>
                            <Item>
                            <Projectname>{project.name}&ensp;{project.pm.map((pm) => { return (<Pm>{pm}</Pm>)})}</Projectname>
                            <Percent></Percent>
                            <PercentIndiv>&ensp;50%</PercentIndiv>
                            </Item>
                              
                        </div>
                        
                        )})}
                </ItemContainer>
            </Container>
        );
    }
}

export default Project;