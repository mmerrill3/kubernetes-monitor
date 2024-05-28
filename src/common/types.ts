export interface Config {
  LOGGING: {
    name: 'kubernetes-monitor';
    level: 'debug' | 'info' | 'warn' | 'error';
  };
  IMAGES_SCANNED_CACHE: {
    MAX_SIZE: number;
    MAX_AGE_MS: number;
  };
  WORKLOADS_SCANNED_CACHE: {
    MAX_SIZE: number;
    MAX_AGE_MS: number;
  };
  WORKLOAD_METADATA_CACHE: {
    MAX_SIZE: number;
    MAX_AGE_MS: number;
  };
  WORKERS_COUNT: number;
  REQUEST_QUEUE_LENGTH: number;
  QUEUE_LENGTH_LOG_FREQUENCY_MINUTES: number;
  INTEGRATION_ID: string;
  SERVICE_ACCOUNT_API_TOKEN: string;
  DEFAULT_KUBERNETES_UPSTREAM_URL: string;
  MAX_RETRY_BACKOFF_DURATION_SECONDS: number;
  SYSDIG_POLLING_INTERVAL_MINS: number;

  // ----------------------------------------
  // Properties injected by Helm (via environment variables) or manually set in code:
  CLUSTER_NAME: string;
  AGENT_ID: string;
  IMAGE_STORAGE_ROOT: '/var/tmp';
  POLICIES_STORAGE_ROOT: '/tmp/policies';
  EXCLUDED_NAMESPACES: string[] | null;
  SKOPEO_COMPRESSION_LEVEL: number;
  SYSDIG_ENDPOINT?: string;
  SYSDIG_TOKEN?: string;
  SYSDIG_RISK_SPOTLIGHT_TOKEN?: string;
  SYSDIG_ENDPOINT_URL?: string;
  SYSDIG_CLUSTER_NAME?: string;
  HTTPS_PROXY: string | undefined;
  HTTP_PROXY: string | undefined;
  NO_PROXY: string | undefined;
  USE_KEEPALIVE: boolean;
  SKIP_K8S_JOBS: boolean;
  DEPLOYMENT_NAME: string;
  DEPLOYMENT_NAMESPACE: string;
  WATCH_NAMESPACE: string;
  INTEGRATION_API: string;
  MONITOR_VERSION: string;
  NAMESPACE: string;
  REUSE_IMAGE_PULLSECRETS: boolean;
}
