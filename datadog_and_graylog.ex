# in dev and test config
config :stats_doggo, impl: StatsDoggo.ConnectionMock

# in config
config :stats_doggo,
  app_name: "yak_bak",
  override_statix_host: {:system, "STATSD_HOST"},
  app_env: {:system, "RAILS_ENV", "dev"},
  enabled: {:system, "STATS_ENABLED", "false"},
  impl: StatsDoggo.Connection
# in router.ex under :browser :api
if Mix.env == :prod do
  plug Plug.LoggerJSON
else
  plug Plug.Logger
end

# in mix.exs
{:cee_log_formatter, "~> 0.1.0"},
{:plug_logger_json, "~> 0.6.0"},
{:stats_doggo, "~> 0.4.2"},

# in rancher_boot.sh

#!/bin/bash
set -e

export RANCHER_IP=$(wget -qO- http://rancher-metadata.rancher.internal/latest/self/container/primary_ip)
export STATSD_HOST=$(wget -qO- http://rancher-metadata.rancher.internal/latest/self/host/hostname)

if [[ "$STATSD_HOST" =~ stag$ ]]; then
  export STATSD_HOST="${STATSD_HOST}.corp.avvo.com"
fi

/opt/app/bin/yak_bak $@
