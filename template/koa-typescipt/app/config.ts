interface Config {
    redis: RedisConfig,
    port: number
}

interface RedisConfig {
    PORT: number,
    HOST: string,
    DB: number,
    TTL: number
}

const config: Config = {
    redis: {
        PORT: 6379,
        HOST: '127.0.0.1',
        DB: 1,
        TTL: 12 * 60 * 60 * 1000
    },
    port: 3000
};

export default config;