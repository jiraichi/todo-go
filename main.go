package main

import (
	"errors"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type todo struct {
	ID        string `json:"id"`
	Item      string `json:"item"`
	Completed bool   `json:"completed"`
}

var todos = []todo{
	{ID: "1", Item: "Read a book", Completed: true},
	{ID: "2", Item: "Complete project", Completed: true},
	{ID: "3", Item: "Study", Completed: true},
	{ID: "4", Item: "Learn new skill", Completed: false},
}

func main() {
	router := gin.Default()
	router.SetTrustedProxies([]string{"localhost"})

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	router.GET("/todos", getTodos)
	router.POST("/todos", addTodo)
	router.GET("/todo/:id", getTodo)
	router.PATCH("/todo/:id", updateTodo)

	router.Run(":8080")
}

func getTodos(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, todos)
}

func addTodo(c *gin.Context) {
	var newTodo todo

	err := c.BindJSON(&newTodo)

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, err.Error())
	}

	todos = append(todos, newTodo)

	c.IndentedJSON(http.StatusCreated, newTodo)
}

func updateTodo(c *gin.Context) {
	id := c.Param("id")

	todo, err := getTodoById(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err.Error())
		return
	}

	todo.Completed = !todo.Completed

	c.IndentedJSON(http.StatusOK, todo)
}

func getTodo(c *gin.Context) {
	id := c.Param("id")

	todo, err := getTodoById(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, err.Error())
		return
	}

	c.IndentedJSON(http.StatusOK, todo)
}

func getTodoById(id string) (*todo, error) {
	for i, t := range todos {
		if t.ID == id {
			return &todos[i], nil
		}
	}

	return nil, errors.New("todo was not found")
}
