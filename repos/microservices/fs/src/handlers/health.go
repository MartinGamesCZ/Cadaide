package handlers

type HealthParams struct{}

type HealthResult struct {
	Ok bool `json:"ok"`
}

func HandleHealth(params HealthParams) (HealthResult, error) {
	return HealthResult{Ok: true}, nil
}
