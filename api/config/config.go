package config

import (
	"time"
)

const (
	APIPortDev        = "8081"
	APIURLDev         = "http://localhost:" + APIPortDev
	DBDriver          = "sqlite3"
	DBPath            = "./db"
	DBFileName        = "forum.db"
	DBSchema          = "schema.sql"
	SessionCookieName = "forumSecretKey"
	SessionExpiration = 1 * time.Hour
	ClientURLDev      = "http://localhost:3000"
	ClientURLProd     = "http://139.59.211.109:3000"
)

var (
	ClientURL = ClientURLProd
)
