import { TimelineItem, SkillItem, ProjectItem } from './types';

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'true-form',
    year: '2024 — PRESENT',
    period: 'CURRENT / 4.5+ YRS',
    kanji: '真の姿',
    title: 'SENIOR .NET ARCHITECT',
    subtitle: '[ CURRENT FORM ]',
    description: 'Operating at peak technical resonance. Designing zero-allocation high-frequency backend services, event-driven reactive grids, real-time WebSocket telemetry engines, and resilient enterprise software architectures built to withstand extreme traffic bursts.',
    highlights: [
      'Designed sub-millisecond memory-cached search engines using C# Ref Structs',
      'Led technical architecture reviews for mission-critical core systems handling $10M+ daily',
      'Pioneered automated chaos engineering scenarios to validate self-healing clusters'
    ],
    techUsed: ['.NET 9', 'C# 13', 'Kubernetes', 'Cloud Native', 'System Design', 'WebSockets'],
    imagePlaceholder: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    memoryFragmentCode: `// Memory Fragment 04: Zero-allocation Span<T> parser
public ReadOnlySpan<char> ExtractSpiritualPulse(ReadOnlySpan<char> rawTelemetry) 
{
    int index = rawTelemetry.IndexOf(':');
    return index != -1 ? rawTelemetry[(index + 1)..].Trim() : ReadOnlySpan<char>.Empty;
}`
  },
  {
    id: 'hollowfication',
    year: '2022 — 2024',
    period: 'YEAR 2.5 - 4.0',
    kanji: '虚化',
    title: 'DEVOPS & SYSTEMS ENGINEER',
    subtitle: '[ KUBERNETES & CI/CD ]',
    description: 'Embraced the raw power of infrastructure automation. Constructed blue/green Jenkins pipeline stages, Docker containerization layers, and Helm chart orchestrations for automated Zero-Downtime deployments across multi-region Kubernetes clusters.',
    highlights: [
      'Authored multi-stage Docker builds reducing image footprints from 1.2GB to 85MB',
      'Automated multi-tenant Jenkins declarative pipelines with parallel matrix testing',
      'Deployed Kubernetes horizontal pod autoscalers responding to custom Prometheus metrics'
    ],
    techUsed: ['Docker', 'Jenkins', 'Kubernetes', 'Helm', 'Prometheus', 'Bash', 'Linux'],
    imagePlaceholder: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    memoryFragmentCode: `# Memory Fragment 03: Jenkinsfile Pipeline Stage
stage('Bankai Deployment') {
  parallel {
    stage('Kanji Lint') { steps { sh 'dotnet format --verify-no-changes' } }
    stage('Container Slice') { steps { sh 'docker build -t reiatsu/engine:\${GIT_COMMIT} .' } }
  }
}`
  },
  {
    id: 'soul-society',
    year: '2021 — 2022',
    period: 'YEAR 1.0 - 2.5',
    kanji: '瀞霊廷',
    title: 'SOFTWARE ENGINEER I',
    subtitle: '[ REDACTED ]',
    description: 'Built RESTful .NET APIs powering mobile applications with 500K+ active users. Deconstructed bloated monolithic enterprise systems into resilient, fault-tolerant microservices using gRPC, Redis distributed caching, and Kafka event streaming. Introduced unit-testing culture — coverage rose from 12% to 84% in nine months.',
    highlights: [
      'Architected gRPC inter-service communication layer supporting 45k ops/sec',
      'Implemented distributed tracing with OpenTelemetry and Jaeger',
      'Engineered idempotent event consumers with Redis distributed locking'
    ],
    techUsed: ['.NET 6', 'gRPC', 'Redis', 'Apache Kafka', 'PostgreSQL', 'Serilog'],
    imagePlaceholder: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    memoryFragmentCode: `// Memory Fragment 02: Resilient Circuit Breaker
public static IHttpClientBuilder AddReiatsuResiliencePolicy(this IHttpClientBuilder builder) =>
    builder.AddPolicyHandler(HttpPolicyExtensions
        .HandleTransientHttpError()
        .CircuitBreakerAsync(handledEventsAllowedBeforeBreaking: 5, TimeSpan.FromSeconds(30)));`
  },
  {
    id: 'awakening',
    year: '2020 — 2021',
    period: 'ORIGIN',
    kanji: '覚醒',
    title: 'JUNIOR DEVELOPER',
    subtitle: '[ ORIGIN ]',
    description: 'First steps into the field. C# fundamentals, SQL mastery, and an obsessive drive to understand every layer of the stack — from raw SQL joins to browser paint cycles. Rebuilt legacy monolithic loops into concurrent thread pipelines.',
    highlights: [
      'Mastered C# type safety, pattern matching, and memory allocation optimization',
      'Built custom high-throughput async processing queues',
      'Refactored legacy synchronous API endpoints reducing response latency by 64%'
    ],
    techUsed: ['C#', '.NET Core', 'SQL Server', 'LINQ', 'xUnit'],
    imagePlaceholder: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    memoryFragmentCode: `// Memory Fragment 01: Low-allocation pipeline buffer
public async ValueTask ProcessSpiritualPayload(ReadOnlyMemory<byte> buffer, CancellationToken ct) 
{
    using var owner = MemoryPool<byte>.Shared.Rent(buffer.Length);
    buffer.CopyTo(owner.Memory);
    await _channelWriter.WriteAsync(owner.Memory[..buffer.Length], ct);
}`
  }
];

export const SKILL_ITEMS: SkillItem[] = [
  {
    id: 'dotnet-csharp',
    name: 'C# / .NET 9',
    category: 'core',
    commandPhrase: 'Slice through execution latency, Zangetsu!',
    proficiency: 98,
    kanji: '斬魄刀',
    description: 'Deep mastery of C# memory management (Span<T>, Memory<T>, MemoryPool), Async/Await synchronization context, LINQ expression trees, reflection, and high-performance ASP.NET Core Web API architecture.',
    iconName: 'Terminal',
    size: 'col-span-1 md:col-span-2',
    codeSnippet: `[HttpPost("reiatsu/execute")]
public async ValueTask<IActionResult> ExecuteCommand([FromBody] ReiatsuPayload payload) 
{
    var result = await _reiatsuEngine.ProcessAsync(payload, HttpContext.RequestAborted);
    return result.IsSuccess ? Ok(result.Value) : UnprocessableEntity(result.Error);
}`,
    bankaiForm: 'Getsuga Tensho: Zero-Allocation Execution Engine'
  },
  {
    id: 'docker',
    name: 'Docker Containerization',
    category: 'devops',
    commandPhrase: 'Encapsulate spiritual mass inside impenetrable layers!',
    proficiency: 92,
    kanji: '封印',
    description: 'Multi-stage Dockerfile optimization, Alpine / Chiseled base images, layer caching strategies, volume mounting, network bridges, and docker-compose microservice orchestrations.',
    iconName: 'Box',
    size: 'col-span-1',
    codeSnippet: `FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["Engine.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/nightly/chiseled/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Engine.dll"]`,
    bankaiForm: 'Kurohitsugi: Immutable Container Isolation'
  },
  {
    id: 'jenkins',
    name: 'Jenkins CI/CD',
    category: 'devops',
    commandPhrase: 'Automate relentless integration pipelines!',
    proficiency: 88,
    kanji: '自動化',
    description: 'Declarative and Scripted Jenkinsfiles, agent node management, automated unit/integration test gates, SonarQube quality gates, Docker image registry pushes, and Kubernetes deployment triggers.',
    iconName: 'Layers',
    size: 'col-span-1',
    codeSnippet: `pipeline {
    agent { label 'k8s-runner' }
    stages {
        stage('Quality Gate') {
            steps { sh 'dotnet test --logger "trx;LogFileName=test_results.trx"' }
        }
    }
}`,
    bankaiForm: 'Senbonzakura Kageyoshi: Infinite Automated Pipelines'
  },
  {
    id: 'systems-architecture',
    name: 'Distributed Systems',
    category: 'architecture',
    commandPhrase: 'Harmonize microservices in absolute spiritual equilibrium!',
    proficiency: 95,
    kanji: '陣形',
    description: 'Domain-Driven Design (DDD), Event Sourcing, CQRS with MediatR, gRPC protocol buffers, Outbox Pattern, Circuit Breaker resilience (Polly), and CAP theorem tradeoffs in distributed environments.',
    iconName: 'Cpu',
    size: 'col-span-1 md:col-span-2',
    codeSnippet: `public sealed record CreateOrderCommand(Guid OrderId, decimal Amount) : IRequest<Result<Guid>>;

public sealed class CreateOrderHandler : IRequestHandler<CreateOrderCommand, Result<Guid>> 
{
    public async Task<Result<Guid>> Handle(CreateOrderCommand request, CancellationToken ct) 
    {
        // CQRS Command Pipeline execution
        return Result.Success(request.OrderId);
    }
}`,
    bankaiForm: 'Daiguren Hyorinmaru: Frozen Crystal Event Mesh'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes & Cloud',
    category: 'devops',
    commandPhrase: 'Command cluster nodes across cloud dimensions!',
    proficiency: 90,
    kanji: '次元',
    description: 'Kubernetes deployment manifests, StatefulSets, Ingress NGINX controllers, ConfigMaps, Secrets, Horizontal Pod Autoscaling (HPA), and Service Mesh (Istio) routing control.',
    iconName: 'Server',
    size: 'col-span-1',
    codeSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: shinigami-api
spec:
  replicas: 5
  strategy:
    type: RollingUpdate`,
    bankaiForm: 'Minazuki: Self-Healing Cluster Domain'
  },
  {
    id: 'postgresql-redis',
    name: 'PostgreSQL & Redis',
    category: 'database',
    commandPhrase: 'Store eternal spirit energy in resilient memory stores!',
    proficiency: 92,
    kanji: '記憶',
    description: 'Entity Framework Core, Dapper micro-ORM for ultra-fast queries, PostgreSQL indexing (B-Tree, GIN, BRIN), Redis distributed caching, pub/sub channels, and atomic Lua scripting.',
    iconName: 'Database',
    size: 'col-span-1 md:col-span-2',
    codeSnippet: `public async Task<Option<UserDto>> GetUserCachedAsync(Guid userId) 
{
    string cacheKey = $"user:{userId}";
    var cached = await _redis.GetStringAsync(cacheKey);
    if (cached != null) return JsonSerializer.Deserialize<UserDto>(cached)!;
    
    var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
    if (user != null) await _redis.SetStringAsync(cacheKey, JsonSerializer.Serialize(user), TimeSpan.FromMinutes(15));
    return user;
}`,
    bankaiForm: 'Ryujin Jakka: Scorching High-Read Database Caching'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-1',
    code: 'PROJECT_001',
    title: 'Kagero / System Overdrive',
    tagline: 'High-Frequency .NET Telemetry Mesh & Real-Time Event Bus',
    description: 'A zero-allocation C# event stream processor engineered to ingest, validate, and broadcast up to 120,000 telemetry messages per second with under 3ms latency.',
    category: 'Distributed Systems',
    techStack: ['.NET 9', 'C#', 'Kafka', 'Redis', 'Docker', 'Grafana'],
    metrics: [
      { label: 'THROUGHPUT', value: '120,000 msg/sec' },
      { label: 'LATENCY', value: '< 2.4 ms' },
      { label: 'ALLOCATION', value: '0 Bytes / Msg' }
    ],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
    githubUrl: 'https://github.com/shinigami-dev/kagero-telemetry-engine',
    liveUrl: 'https://github.com/shinigami-dev/kagero-telemetry-engine',
    kanjiOverlay: '蜉蝣',
    architectureDiagram: `[ Producer Nodes ] ---> (gRPC / TLS 1.3) ---> [ Kagero Ingestion Engine (.NET 9) ]
                                                            |
                                               +------------+------------+
                                               |                         |
                                       [ Kafka Cluster ]         [ Redis Memory Ring ]
                                               |                         |
                                       [ Realtime Worker ]        [ Grafana Dashboard ]`
  },
  {
    id: 'project-2',
    code: 'PROJECT_002',
    title: 'Kurohitsugi / DevSecOps Gate',
    tagline: 'Automated Jenkins & Kubernetes Deployment Safeguard',
    description: 'A declarative CI/CD security gate that scans container vulnerabilities, enforces zero-trust policy checks, and executes automated blue-green rollouts on Kubernetes.',
    category: 'DevOps & Infrastructure',
    techStack: ['Jenkins', 'Kubernetes', 'Helm', 'Docker', 'Go', 'Bash'],
    metrics: [
      { label: 'BUILD TIME', value: '-65% Faster' },
      { label: 'DOWNTIME', value: '0.00 Seconds' },
      { label: 'PASS RATE', value: '99.98%' }
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop',
    githubUrl: 'https://github.com/shinigami-dev/kurohitsugi-jenkins-gate',
    liveUrl: 'https://github.com/shinigami-dev/kurohitsugi-jenkins-gate',
    kanjiOverlay: '黒棺',
    architectureDiagram: `[ Git Commit ] ---> [ Jenkinsfile Trigger ] ---> [ SonarQube & Trivy Scan ]
                                                             |
                                            (All Vulnerability Checks Pass)
                                                             |
                                           [ Docker Multi-Stage Build ] ---> [ Push to Registry ]
                                                             |
                                           [ Helm Upgrade (Kubernetes) ] ---> [ Blue/Green Switch ]`
  },
  {
    id: 'project-3',
    code: 'PROJECT_003',
    title: 'Senbonzakura / Distributed Ledger',
    tagline: 'CQRS & Event-Sourced High-Throughput Core Banking Engine',
    description: 'An immutable event-sourced financial ledger built using ASP.NET Core, PostgreSQL, and MediatR, capable of processing parallel financial transactions without lock contention.',
    category: 'Financial Core System',
    techStack: ['.NET Core', 'CQRS', 'PostgreSQL', 'Redis', 'Docker', 'xUnit'],
    metrics: [
      { label: 'CONCURRENCY', value: '50k Ops/Sec' },
      { label: 'CONSISTENCY', value: 'ACID Compliant' },
      { label: 'REPLAY TIME', value: '1.2s / 1M events' }
    ],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    githubUrl: 'https://github.com/shinigami-dev/senbonzakura-cqrs-ledger',
    liveUrl: 'https://github.com/shinigami-dev/senbonzakura-cqrs-ledger',
    kanjiOverlay: '千本桜',
    architectureDiagram: `[ API Endpoint ] ---> [ MediatR Command ] ---> [ Event Store (PostgreSQL) ]
                                                          |
                                           [ Event Publisher (Channel) ]
                                                          |
                                           +--------------+--------------+
                                           |                             |
                                   [ Read Model Sync ]          [ Audit Log Storage ]`
  }
];
