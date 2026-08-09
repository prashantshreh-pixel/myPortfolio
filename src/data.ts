import { TimelineItem, SkillItem, ProjectItem } from './types';

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'ime-remittance',
    projectId: 'project-ime',
    year: 'DEC 2024 — PRESENT',
    period: 'CURRENT / 4.5+ YRS EXP',
    kanji: '真の姿',
    title: 'SOFTWARE ENGINEER — IME LTD.',
    subtitle: '[ CORE REMITTANCE PROCESSING ENGINE · KATHMANDU ]',
    description: 'Architecting and maintaining the core IME Nepal remittance processing engine, handling high-volume transaction throughput across domestic and cross-border financial corridors. Implementing package-based modular design and the Factory Design Pattern to abstract payment gateway logic with real-time transaction reconciliation.',
    highlights: [
      'Architected high-volume remittance processing engine handling critical transaction corridors across Nepal and international partners',
      'Integrated local and international banking APIs (SOAP, RESTful) ensuring low-latency data exchange, strict security protocols, and real-time reconciliation',
      'Implemented package-based modular design and applied Factory Design Pattern to abstract payment gateway logic',
      'Leveraged AI tools to accelerate development velocity, refactoring, and integration testing'
    ],
    techUsed: ['C#', '.NET Core', 'ASP.NET Core', 'Clean Architecture', 'Factory Pattern', 'SOAP / REST APIs', 'FinTech'],
    imagePlaceholder: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    memoryFragmentCode: `// Memory Fragment 04: Factory Pattern Payment Gateway Dispatcher
public interface IPaymentGatewayService 
{
    Task<RemittanceResult> ProcessTransactionAsync(TransactionPayload payload, CancellationToken ct);
}

public sealed class RemittanceGatewayFactory : IRemittanceGatewayFactory 
{
    private readonly IServiceProvider _serviceProvider;
    public RemittanceGatewayFactory(IServiceProvider sp) => _serviceProvider = sp;

    public IPaymentGatewayService ResolveGateway(GatewayProvider provider) => provider switch 
    {
        GatewayProvider.DomesticCorridor => _serviceProvider.GetRequiredService<DomesticRemittanceService>(),
        GatewayProvider.InternationalCrossBorder => _serviceProvider.GetRequiredService<CrossBorderRemittanceService>(),
        _ => throw new NotSupportedException($"Gateway provider '{provider}' is not supported.")
    };
}`
  },
  {
    id: 'prabhu-technology',
    projectId: 'project-prabhupay',
    year: 'AUG 2023 — NOV 2024',
    period: 'YEAR 2.5 — 4.0',
    kanji: '虚化',
    title: '.NET DEVELOPER — PRABHU TECHNOLOGY',
    subtitle: '[ PRABHUPAY DIGITAL BANKING & WALLET PLATFORM ]',
    description: 'Developed backend microservices and core infrastructure for PrabhuPay, enabling digital banking and multi-tenant digital wallet services for nationwide user networks. Designed Maker-Checker authorization workflows to govern high-value operations and ensure strict financial compliance.',
    highlights: [
      'Constructed backend microservices and core infrastructure for PrabhuPay digital banking platform across nationwide user networks',
      'Designed and deployed Maker-Checker dual-authorization workflows within administrative portals to govern high-value financial operations',
      'Engineered and deployed RESTful and SOAP API endpoints for third-party merchant integration and real-time payment inquiries',
      'Optimized transaction security protocols and ensured compliance with national banking standards'
    ],
    techUsed: ['ASP.NET Core', '.NET Core', 'Microservices', 'Maker-Checker Security', 'REST / SOAP', 'SQL Server'],
    imagePlaceholder: '/assets/prabhuPay.png',
    memoryFragmentCode: `// Memory Fragment 03: Maker-Checker Financial Authorization Workflow
public async Task<Result<AuthorizationResponse>> AuthorizeTransactionAsync(Guid transactionId, Guid checkerUserId, CancellationToken ct)
{
    var tx = await _db.Transactions.FirstOrDefaultAsync(t => t.Id == transactionId, ct);
    if (tx == null) return Result.Failure<AuthorizationResponse>("Transaction not found.");
    if (tx.InitiatorUserId == checkerUserId)
        return Result.Failure<AuthorizationResponse>("Maker-Checker Violation: Maker cannot authorize own transaction.");

    tx.Authorize(checkerUserId, DateTime.UtcNow);
    await _db.SaveChangesAsync(ct);
    return Result.Success(new AuthorizationResponse(tx.Id, TransactionStatus.Approved));
} `
  },
  {
    id: 'global-square',
    projectId: 'project-crs',
    year: 'OCT 2023 — DEC 2023',
    period: 'FREELANCE / CONSULTING',
    kanji: '瀞霊廷',
    title: '.NET DEVELOPER — GLOBAL SQUARE',
    subtitle: '[ JAPANESE CLUB RESERVATION SYSTEM (CRS) ]',
    description: 'Engineered a Club Reservation System (CRS) web application for Japanese hospitality networks using Jira for Agile delivery. Designed normalized relational database schemas and optimized complex SQL stored procedures and user-defined functions to maximize query throughput.',
    highlights: [
      'Engineered Japanese hospitality Club Reservation System (CRS) web platform using ASP.NET MVC and C#',
      'Designed normalized relational database schemas and optimized complex SQL stored procedures and UDFs',
      'Managed agile sprint tasks, user stories, and feature delivery utilizing Jira project management',
      'Maximized query throughput and handled peak night-time reservation traffic without lock contention'
    ],
    techUsed: ['C#', 'ASP.NET MVC', 'SQL Server', 'Stored Procedures', 'Database Optimization', 'Jira Agile'],
    imagePlaceholder: '/assets/G.S.I.C.jpg',
    memoryFragmentCode: `-- Memory Fragment 02: High-Concurrency Reservation Stored Procedure
CREATE PROCEDURE dbo.sp_ReserveClubVenueSlot
    @VenueId INT,
    @ReservationDate DATETIME,
    @UserId INT,
    @ResultCode INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
        IF EXISTS (SELECT 1 FROM dbo.VenueReservations WITH (UPDLOCK, ROWLOCK) 
                   WHERE VenueId = @VenueId AND ReservationDate = @ReservationDate AND Status = 'CONFIRMED')
        BEGIN
            SET @ResultCode = -1; -- Slot already reserved
            ROLLBACK TRANSACTION;
            RETURN;
        END
        INSERT INTO dbo.VenueReservations (VenueId, ReservationDate, UserId, Status, CreatedAt)
        VALUES (@VenueId, @ReservationDate, @UserId, 'CONFIRMED', GETUTCDATE());
        SET @ResultCode = 1;
    COMMIT TRANSACTION;
END`
  },
  {
    id: 'dg-hub',
    projectId: 'project-multiwallet',
    year: 'SEP 2021 — JUN 2023',
    period: 'ORIGIN',
    kanji: '覚醒',
    title: 'INTERN / JUNIOR DEVELOPER — DG HUB',
    subtitle: '[ MULTI-WALLET SUITE · MYPAY · PAYWELL · THAILI · CHHITO PAISA ]',
    description: 'Contributed to the backend development and maintenance of digital wallet applications including MyPay, PayWell, Chhito Paisa, and Thaili. Built Admin, Merchant, and Client management interfaces utilizing ASP.NET Core and the Repository design pattern. Authored custom DLL libraries and Web API modules facilitating utility bill payments and real-time balance inquiries.',
    highlights: [
      'Engineered backend digital wallet modules across MyPay, PayWell, Chhito Paisa, and Thaili ecosystems',
      'Built Admin, Merchant, and Client management portals using ASP.NET Core and the Repository pattern',
      'Authored custom DLL libraries and Web API modules facilitating real-time utility bill payments and balance inquiries',
      'Established solid foundations in C#, Entity Framework Core, SQL Server, and modular package architecture'
    ],
    techUsed: ['C#', 'ASP.NET Core', 'Repository Pattern', 'Digital Wallets', 'Custom DLLs', 'Web API'],
    imagePlaceholder: '/assets/DgHub.png',
    memoryFragmentCode: `[HttpPost, ValidateAntiForgeryToken]
public JsonResult EnableCategory(string ChargeCategoryId)
{
    var Common = new ChargeCategoryCommon();
    ChargeCategoryId = ChargeCategoryId.DecryptParameter();
    if (string.IsNullOrEmpty(ChargeCategoryId))
    {
        this.ShowPopup(1, "Invalid category.");
        return Json(new { Code = 1, Message = "Invalid User" });
    }

    Common.IsActive = "y";
    Common.ChargeCategoryId = ChargeCategoryId;
    Common.ActionUser = ApplicationUtilities.GetSessionValue("UserName").ToString();
    Common.IpAddress = ApplicationUtilities.GetIP();
    Common.BrowserInfo = ApplicationUtilities.GetBrowserInfo();

    var dbresp = _buss.EnableDisableCategory(Common);
    dbresp.Extra1 = "true"; // For Reloading page after clicking Close
    return Json(dbresp.SetMessageInTempData(this));
}`
  }
];

export const SKILL_ITEMS: SkillItem[] = [
  {
    id: 'csharp-dotnet',
    name: 'C# / .NET & ASP.NET Core',
    category: 'core',
    commandPhrase: 'Slice through transaction latency with zero allocation, Zangetsu!',
    proficiency: 98,
    kanji: '斬魄刀',
    description: 'Deep expertise in C#, .NET Core, ASP.NET Core, Entity Framework Core, ASP.NET MVC, Web API, asynchronous pipelines, and high-concurrency payment processing engines.',
    iconName: 'Terminal',
    size: 'col-span-1',
    codeSnippet: `[HttpPost("remittance/process")]
public async Task<IActionResult> ProcessRemittance([FromBody] RemittanceRequest request, CancellationToken ct) 
{
    var gateway = _gatewayFactory.ResolveGateway(request.Provider);
    var result = await gateway.ProcessTransactionAsync(request.Payload, ct);
    return result.IsSuccess ? Ok(result.Value) : UnprocessableEntity(result.Error);
}`,
    bankaiForm: 'Getsuga Tensho: High-Concurrency FinTech Engine'
  },
  {
    id: 'architecture-patterns',
    name: 'Enterprise Architecture & Patterns',
    category: 'architecture',
    commandPhrase: 'Harmonize multi-tenant payment gateways in absolute spiritual equilibrium!',
    proficiency: 96,
    kanji: '陣形',
    description: 'Clean Architecture, Package-Based Modular Design, Factory Pattern for gateway abstraction, Repository Pattern, Dependency Injection, and Maker-Checker authorization workflows.',
    iconName: 'Cpu',
    size: 'col-span-1',
    codeSnippet: `public interface IPaymentGatewayService {
    Task<RemittanceResult> ProcessTransactionAsync(TransactionPayload payload, CancellationToken ct);
}

// Clean Architecture Domain Abstraction
public sealed class DomesticRemittanceService : IPaymentGatewayService {
    public async Task<RemittanceResult> ProcessTransactionAsync(TransactionPayload p, CancellationToken ct) {
        // High-volume corridor processing
        return RemittanceResult.Success(p.TransactionId);
    }
}`,
    bankaiForm: 'Daiguren Hyorinmaru: Resilient Gateway Mesh'
  },
  {
    id: 'fintech-integrations',
    name: 'FinTech Integrations & Protocols',
    category: 'core',
    commandPhrase: 'Bridge domestic and cross-border financial corridors with low-latency APIs!',
    proficiency: 95,
    kanji: '結界',
    description: 'RESTful Web APIs, SOAP protocol integrations, Swagger / OpenAPI specifications, Payment Gateways, and third-party banking & remittance API connections with automated reconciliation.',
    iconName: 'Layers',
    size: 'col-span-1',
    codeSnippet: `public async Task<SoapRemittanceResponse> InvokeBankingSoapEndpointAsync(SoapPayload payload) 
{
    using var client = new BankingSoapServiceClient();
    var response = await client.ExecuteTransferAsync(payload);
    return response.ToDomainModel();
}`,
    bankaiForm: 'Senbonzakura Kageyoshi: Infinite API Streams'
  },
  {
    id: 'databases-sql',
    name: 'SQL Server, PostgreSQL & MySQL',
    category: 'database',
    commandPhrase: 'Index eternal ledger state across high-volume transaction stores!',
    proficiency: 94,
    kanji: '記憶',
    description: 'Advanced SQL Server, PostgreSQL, MySQL database design, normalized relational schemas, complex stored procedures, user-defined functions (UDFs), and transaction locking strategies.',
    iconName: 'Database',
    size: 'col-span-1',
    codeSnippet: `CREATE PROCEDURE dbo.sp_ReconcileCorridorBatch
    @CorridorId VARCHAR(50),
    @ReconciledCount INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE dbo.RemittanceTransactions
    SET Status = 'SETTLED', ReconciledAt = GETUTCDATE()
    WHERE CorridorId = @CorridorId AND Status = 'PENDING_SETTLEMENT';
    SET @ReconciledCount = @@ROWCOUNT;
END`,
    bankaiForm: 'Ryujin Jakka: Scorching Relational Query Engine'
  },
  {
    id: 'maker-checker-security',
    name: 'Maker-Checker & Transaction Security',
    category: 'architecture',
    commandPhrase: 'Enforce impenetrable two-man rule authorization across administrative portals!',
    proficiency: 92,
    kanji: '封印',
    description: 'Designing Maker-Checker governance, dual-custody approval pipelines, fraud prevention, audit trails, and strict transaction verification for digital banking and wallets.',
    iconName: 'Box',
    size: 'col-span-1',
    codeSnippet: `if (transaction.InitiatorUserId == reviewerUserId) 
{
    throw new SecurityException("Maker-Checker Violation: Maker cannot approve their own high-value transaction.");
}`,
    bankaiForm: 'Kurohitsugi: Immutable Audit & Access Control'
  },
  {
    id: 'devops-tools-ai',
    name: 'DevOps, Agile & AI Tooling',
    category: 'devops',
    commandPhrase: 'Command agile sprint pipelines and AI-accelerated delivery velocity!',
    proficiency: 90,
    kanji: '次元',
    description: 'Git, GitHub, GitLab, TortoiseSVN, Jira Agile task management, Postman API testing, and AI-accelerated development tools for rapid refactoring and integration testing.',
    iconName: 'Server',
    size: 'col-span-1',
    codeSnippet: `# Git Branching & AI-Assisted CI Pipeline Trigger
git checkout -b feature/ime-payment-gateway
dotnet test --filter Category=IntegrationTests`,
    bankaiForm: 'Minazuki: Self-Healing Development Lifecycle'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-ime',
    code: 'PROJECT_001',
    title: 'IME Nepal / Core Remittance Processing Engine',
    tagline: 'High-Volume Domestic & Cross-Border Remittance Corridor Backbone',
    description: 'The core remittance processing engine powering IME Nepal, architected to handle high-volume transaction throughput across domestic and international financial corridors with real-time SOAP/RESTful banking API integrations, Factory Pattern gateway abstractions, and automated transaction reconciliation.',
    category: 'Core FinTech & Remittance',
    techStack: ['C#', '.NET Core', 'ASP.NET Core', 'Clean Architecture', 'Factory Pattern', 'SOAP / REST', 'SQL Server'],
    metrics: [
      { label: 'THROUGHPUT', value: 'Domestic & Global Corridors' },
      { label: 'RECONCILIATION', value: 'Real-Time Automated' },
      { label: 'GATEWAY DESIGN', value: 'Factory Pattern Abstraction' }
    ],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1600&auto=format&fit=crop',
    githubUrl: 'https://github.com/prashantshreh-pixel',
    liveUrl: 'https://github.com/prashantshreh-pixel',
    kanjiOverlay: '送金',
    architectureDiagram: `[ Remittance Agent / Web Portal ] ---> [ IME API Gateway (.NET Core) ]
                                              |
                               +--------------+--------------+
                               |                             |
                [ Factory Gateway Dispatcher ]     [ Real-Time Reconciliation ]
                               |                             |
                [ Domestic Banking Corridors ]     [ Global Cross-Border Partners ]`
  },
  {
    id: 'project-prabhupay',
    code: 'PROJECT_002',
    title: 'PrabhuPay / Digital Banking & Wallet Platform',
    tagline: 'Nationwide Wallet Infrastructure & Maker-Checker Security Governance',
    description: 'Developed backend microservices and core infrastructure for PrabhuPay, enabling digital banking and multi-tenant digital wallet services for nationwide user networks. Implemented Maker-Checker dual-authorization workflows for administrative operations and third-party merchant inquiry APIs.',
    category: 'Digital Banking & Wallets',
    techStack: ['ASP.NET Core', '.NET Core', 'Microservices', 'Maker-Checker', 'RESTful API', 'SQL Server', 'Jira'],
    metrics: [
      { label: 'NETWORK REACH', value: 'Nationwide User Base' },
      { label: 'SECURITY MODEL', value: 'Maker-Checker Approval' },
      { label: 'API AVAILABILITY', value: '99.99% High Uptime' }
    ],
    image: '/assets/prabhuTech.jpg',
    imagePosition: 'object-left sm:object-[15%_center]',
    githubUrl: 'https://github.com/prashantshreh-pixel',
    liveUrl: 'https://github.com/prashantshreh-pixel',
    kanjiOverlay: '銀行',
    architectureDiagram: `[ Mobile Apps / Merchant Terminals ] ---> [ PrabhuPay Core Gateway ]
                                                    |
                                     +--------------+--------------+
                                     |                             |
                      [ Digital Wallet Microservices ]    [ Maker-Checker Admin Portal ]
                                     |                             |
                      [ Utility Bill Pay Modules ]        [ Compliance & Audit Engine ]`
  },
  {
    id: 'project-multiwallet',
    code: 'PROJECT_003',
    title: 'Multi-Wallet Suite (MyPay, PayWell, Thaili, Chhito Paisa)',
    tagline: 'Modular ASP.NET Core Digital Wallet Ecosystem & Custom DLL Utility Libraries',
    description: 'Contributed to the backend development of digital wallet ecosystems including MyPay, PayWell, Chhito Paisa, and Thaili. Built Admin, Merchant, and Client management interfaces with the Repository pattern, and authored custom C# DLL libraries facilitating utility bill payments and real-time balance inquiries.',
    category: 'Multi-Tenant FinTech',
    techStack: ['C#', 'ASP.NET Core', 'Repository Pattern', 'Custom DLLs', 'Entity Framework', 'RESTful APIs'],
    metrics: [
      { label: 'ECOSYSTEM', value: '4+ Digital Wallets' },
      { label: 'DESIGN PATTERN', value: 'Repository Pattern' },
      { label: 'UTILITY MODULES', value: 'Custom C# DLLs' }
    ],
    image: '/assets/wallet-cover.png',
    liveUrls: [
      { label: 'MYPAY WALLET (LIVE)', url: 'https://mypay.com.np/' },
      { label: 'THAILI WALLET (LIVE)', url: 'https://thaili.com.np/#/login' }
    ],
    kanjiOverlay: '財布',
    architectureDiagram: `[ Multi-Wallet Clients (MyPay / PayWell / Thaili) ] ---> [ Admin & Merchant Portals ]
                                                                      |
                                                       [ Repository Data Access Layer ]
                                                                      |
                                                       +--------------+--------------+
                                                       |                             |
                                            [ Custom Utility DLLs ]        [ Real-Time Balance Inquiry ]`
  },
  {
    id: 'project-crs',
    code: 'PROJECT_004',
    title: 'Japanese Club Reservation System (CRS)',
    tagline: 'High-Concurrency Venue Booking Engine & Normalized Stored Procedure Architecture',
    description: 'An enterprise web application developed for Japanese hospitality networks, managing venue capacities, host availability, and real-time reservation scheduling with optimized SQL stored procedures and UDFs to handle peak night-time reservation traffic.',
    category: 'Enterprise Hospitality Platform',
    techStack: ['C#', 'ASP.NET MVC', 'SQL Server', 'Stored Procedures', 'Agile / Jira', 'Normalized Schemas'],
    metrics: [
      { label: 'TARGET MARKET', value: 'Japan Hospitality' },
      { label: 'DATABASE TUNING', value: 'Optimized Stored Procs' },
      { label: 'AGILE WORKFLOW', value: 'Jira Task Tracking' }
    ],
    image: '/assets/CRS background image.jpg',
    kanjiOverlay: '予約',
    architectureDiagram: `[ Venue Host UI / Client Booking Portal ] ---> [ ASP.NET MVC Application Layer ]
                                                                 |
                                                 [ Normalized Relational Schema ]
                                                                 |
                                                 [ High-Speed Stored Procedures & UDFs ]`
  }
];
