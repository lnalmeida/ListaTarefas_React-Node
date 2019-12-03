import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props)

        this.state = { description: '', list: [] }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleMarkAsDone= this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        
        this.refresh()
    }
    
    refresh(description = '') {
        console.log('refresh')
        const search = description ? `&description__regex=/${description}/i` : ''
        axios
          .get(`${URL}?sort=-createdAt${search}`)
          .then(res => {
                console.log(this.state.description)
                this.setState({...this.state, description, list: res.data})
                console.log(this.state.description)
            })
          .catch(err => console.error('Erro ao carregar registros', err))
    }

    handleChange(event) {
        this.setState({ ...this.state, description: event.target.value })
    }

    handleAdd() {
        const { description } = this.state
        axios.post(URL, { description })
             .then(res => this.refresh())
             .catch(err => console.log('Erro na inclusão'))
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
             .then(res => this.refresh(this.state.description))
             .catch(err => console.error('Erro ao excluir registro', err))
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
             .then(res => this.refresh(this.state.description))
             .catch(err => console.log('Erro ao atualizar o registro', err))
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
             .then(res => this.refresh(this.state.description))
             .catch(err => console.log('Erro ao atualizar o registro', err))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleClear() {
        console.log('clear')
        this.refresh()
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro' />
                <TodoForm 
                    description={this.state.description}
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                />
                <TodoList 
                    list={this.state.list}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    handleRemove={this.handleRemove}
                />
            </div>
        )
    }
}