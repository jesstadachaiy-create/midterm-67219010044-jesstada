import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;
import java.util.List;
import java.util.ArrayList;

/**
 * Anime Space - Java Swing version
 * แปลงมาจากหน้าเว็บ index.html / style.css
 *
 * วิธีคอมไพล์และรัน:
 *   javac AnimeSpace.java
 *   java AnimeSpace
 */
public class AnimeSpace extends JFrame {

    // ===== Palette (ตามค่าใน style.css) =====
    static final Color BG      = Color.decode("#F6F7FB");
    static final Color SURFACE = Color.WHITE;
    static final Color INK     = Color.decode("#1F2233");
    static final Color MUTED   = Color.decode("#6B7280");
    static final Color CORAL   = Color.decode("#FF7A59");
    static final Color VIOLET  = Color.decode("#7C5CFC");
    static final Color BORDER  = Color.decode("#ECEDF3");

    static final Font FONT_TITLE   = new Font("SansSerif", Font.BOLD, 26);
    static final Font FONT_HEAD    = new Font("SansSerif", Font.BOLD, 20);
    static final Font FONT_BODY    = new Font("SansSerif", Font.PLAIN, 14);
    static final Font FONT_SMALL   = new Font("SansSerif", Font.PLAIN, 12);
    static final Font FONT_EYEBROW = new Font("SansSerif", Font.BOLD, 12);

    // ข้อมูล anime (แก้ชื่อเรื่อง/คำโปรยตรงนี้ได้เลย)
    static class Anime {
        int rank; String title; String note; Color accent;
        Anime(int rank, String title, String note, Color accent) {
            this.rank = rank; this.title = title; this.note = note; this.accent = accent;
        }
    }

    public AnimeSpace() {
        super("เจษฎา ไชยยา | Anime Space");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(900, 900);
        setLocationRelativeTo(null);

        JPanel root = new JPanel();
        root.setLayout(new BoxLayout(root, BoxLayout.Y_AXIS));
        root.setBackground(BG);

        root.add(buildNav());
        root.add(buildHero());

        JPanel wrap = new JPanel();
        wrap.setLayout(new BoxLayout(wrap, BoxLayout.Y_AXIS));
        wrap.setBackground(BG);
        wrap.setBorder(new EmptyBorder(24, 32, 24, 32));
        wrap.setAlignmentX(Component.LEFT_ALIGNMENT);

        wrap.add(buildProfileCard());
        wrap.add(Box.createRigidArea(new Dimension(0, 30)));
        wrap.add(buildSectionTitle());
        wrap.add(Box.createRigidArea(new Dimension(0, 16)));
        wrap.add(buildAnimeGrid());
        wrap.add(Box.createRigidArea(new Dimension(0, 30)));
        wrap.add(buildFooter());

        root.add(wrap);

        JScrollPane scroll = new JScrollPane(root);
        scroll.setBorder(null);
        scroll.getVerticalScrollBar().setUnitIncrement(16);
        setContentPane(scroll);
    }

    // ===== Top nav =====
    private JPanel buildNav() {
        JPanel nav = new JPanel(new BorderLayout());
        nav.setBackground(new Color(246, 247, 251));
        nav.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createMatteBorder(0, 0, 1, 0, BORDER),
                new EmptyBorder(14, 32, 14, 32)));
        nav.setMaximumSize(new Dimension(Integer.MAX_VALUE, 55));

        JPanel brand = new JPanel(new FlowLayout(FlowLayout.LEFT, 8, 0));
        brand.setOpaque(false);
        JLabel dot = new JLabel("●");
        dot.setForeground(CORAL);
        brand.add(dot);
        JLabel brandLabel = new JLabel("Anime Space");
        brandLabel.setFont(new Font("SansSerif", Font.BOLD, 16));
        brandLabel.setForeground(INK);
        brand.add(brandLabel);

        JPanel links = new JPanel(new FlowLayout(FlowLayout.RIGHT, 26, 0));
        links.setOpaque(false);
        JLabel l1 = new JLabel("โปรไฟล์");
        JLabel l2 = new JLabel("Top 5");
        for (JLabel l : new JLabel[]{l1, l2}) {
            l.setFont(FONT_BODY);
            l.setForeground(MUTED);
        }
        links.add(l1);
        links.add(l2);

        nav.add(brand, BorderLayout.WEST);
        nav.add(links, BorderLayout.EAST);
        return nav;
    }

    // ===== Hero banner =====
    private JPanel buildHero() {
        JPanel hero = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                Graphics2D g2 = (Graphics2D) g;
                g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
                GradientPaint gp = new GradientPaint(0, 0, Color.decode("#1F2233"),
                        getWidth(), getHeight(), Color.decode("#2A2D3E"));
                g2.setPaint(gp);
                g2.fillRect(0, 0, getWidth(), getHeight());
            }
        };
        hero.setLayout(new BoxLayout(hero, BoxLayout.Y_AXIS));
        hero.setPreferredSize(new Dimension(900, 280));
        hero.setMaximumSize(new Dimension(Integer.MAX_VALUE, 280));
        hero.setBorder(new EmptyBorder(40, 40, 40, 40));

        JLabel eyebrow = new JLabel("อันดับ 1 ในดวงใจ");
        eyebrow.setFont(FONT_EYEBROW);
        eyebrow.setForeground(CORAL);
        eyebrow.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel title = new JLabel("The Apothecary Diaries");
        title.setFont(new Font("SansSerif", Font.BOLD, 32));
        title.setForeground(Color.WHITE);
        title.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel desc = new JLabel("เรื่องนี้คือที่สุดในใจเพราะ...");
        desc.setFont(FONT_BODY);
        desc.setForeground(Color.decode("#D8DAE6"));
        desc.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel rating = new JLabel("★★★★★  5.0 / 5");
        rating.setFont(new Font("SansSerif", Font.BOLD, 14));
        rating.setForeground(CORAL);
        rating.setAlignmentX(Component.LEFT_ALIGNMENT);
        rating.setBorder(new EmptyBorder(10, 0, 0, 0));

        hero.add(eyebrow);
        hero.add(Box.createRigidArea(new Dimension(0, 8)));
        hero.add(title);
        hero.add(Box.createRigidArea(new Dimension(0, 6)));
        hero.add(desc);
        hero.add(rating);

        return hero;
    }

    // ===== Profile card =====
    private JPanel buildProfileCard() {
        RoundedPanel card = new RoundedPanel(24, SURFACE);
        card.setLayout(new BorderLayout(20, 0));
        card.setBorder(new EmptyBorder(24, 24, 24, 24));
        card.setAlignmentX(Component.LEFT_ALIGNMENT);
        card.setMaximumSize(new Dimension(Integer.MAX_VALUE, 220));

        // avatar
        JPanel avatar = new JPanel(new BorderLayout());
        avatar.setPreferredSize(new Dimension(110, 110));
        avatar.setOpaque(false);
        RoundedPanel circle = new RoundedPanel(110, CORAL);
        circle.setLayout(new GridBagLayout());
        JLabel catEmoji = new JLabel("🐱");
        catEmoji.setFont(new Font("SansSerif", Font.PLAIN, 44));
        circle.add(catEmoji);
        avatar.add(circle, BorderLayout.CENTER);

        // text
        JPanel textPanel = new JPanel();
        textPanel.setLayout(new BoxLayout(textPanel, BoxLayout.Y_AXIS));
        textPanel.setOpaque(false);

        JLabel eyebrow = new JLabel("CHARACTER PROFILE");
        eyebrow.setFont(FONT_EYEBROW);
        eyebrow.setForeground(VIOLET);
        eyebrow.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel name = new JLabel("เจษฎา ไชยยา");
        name.setFont(FONT_TITLE);
        name.setForeground(INK);
        name.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel nickname = new JLabel("ชื่อเล่น กิ่ง");
        nickname.setFont(FONT_BODY);
        nickname.setForeground(MUTED);
        nickname.setAlignmentX(Component.LEFT_ALIGNMENT);

        JTextArea bio = new JTextArea(
                "ยินดีต้อนรับสู่เว็บที่เอาไว้ให้พวกเธอทำข้อสอบกลางภาค เพื่อ 20 คะแนน\n" +
                "จงท่อง 3 อ. อต เอา อิ");
        bio.setFont(FONT_BODY);
        bio.setForeground(INK);
        bio.setLineWrap(true);
        bio.setWrapStyleWord(true);
        bio.setEditable(false);
        bio.setOpaque(false);
        bio.setAlignmentX(Component.LEFT_ALIGNMENT);
        bio.setMaximumSize(new Dimension(500, 60));

        JPanel pills = new JPanel(new FlowLayout(FlowLayout.LEFT, 8, 0));
        pills.setOpaque(false);
        pills.setAlignmentX(Component.LEFT_ALIGNMENT);
        for (String p : new String[]{"🎬 อนิเมะ", "📚 การ์ตูน", "🐱 ทาสแมว"}) {
            pills.add(makePill(p));
        }

        textPanel.add(eyebrow);
        textPanel.add(Box.createRigidArea(new Dimension(0, 4)));
        textPanel.add(name);
        textPanel.add(Box.createRigidArea(new Dimension(0, 2)));
        textPanel.add(nickname);
        textPanel.add(Box.createRigidArea(new Dimension(0, 10)));
        textPanel.add(bio);
        textPanel.add(Box.createRigidArea(new Dimension(0, 12)));
        textPanel.add(pills);

        card.add(avatar, BorderLayout.WEST);
        card.add(textPanel, BorderLayout.CENTER);
        return card;
    }

    private JLabel makePill(String text) {
        JLabel pill = new JLabel(text) {
            @Override
            protected void paintComponent(Graphics g) {
                Graphics2D g2 = (Graphics2D) g.create();
                g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
                g2.setColor(BG);
                g2.fillRoundRect(0, 0, getWidth(), getHeight(), 20, 20);
                g2.dispose();
                super.paintComponent(g);
            }
        };
        pill.setFont(FONT_SMALL);
        pill.setForeground(INK);
        pill.setBorder(new EmptyBorder(6, 14, 6, 14));
        pill.setOpaque(false);
        return pill;
    }

    // ===== Section title =====
    private JPanel buildSectionTitle() {
        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setOpaque(false);
        panel.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel eyebrow = new JLabel("MY COLLECTION");
        eyebrow.setFont(FONT_EYEBROW);
        eyebrow.setForeground(CORAL);
        eyebrow.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel title = new JLabel("Top 5 Favorite Anime");
        title.setFont(FONT_TITLE);
        title.setForeground(INK);
        title.setAlignmentX(Component.LEFT_ALIGNMENT);

        panel.add(eyebrow);
        panel.add(Box.createRigidArea(new Dimension(0, 4)));
        panel.add(title);
        return panel;
    }

    // ===== Anime grid =====
    private JPanel buildAnimeGrid() {
        List<Anime> animeList = new ArrayList<>();
        animeList.add(new Anime(1, "The Apothecary Diaries", "เรื่องนี้คือที่สุดในใจเพราะ...", CORAL));
        animeList.add(new Anime(2, "Kaiju No.8", "เรื่องนี้คือที่สุดในใจเพราะ...", VIOLET));
        animeList.add(new Anime(3, "Alya Sometimes Hides Her Feelings In Russian", "เรื่องนี้คือที่สุดในใจเพราะ...", CORAL));
        animeList.add(new Anime(4, "Kamisama Hajimemashita", "เรื่องนี้คือที่สุดในใจ...", VIOLET));
        animeList.add(new Anime(5, "Yamada-kun to Lv999 no Koi wo Suru", "เรื่องนี้คือที่สุดในใจเพราะ...", CORAL));

        JPanel grid = new JPanel(new GridLayout(0, 3, 18, 18));
        grid.setOpaque(false);
        grid.setAlignmentX(Component.LEFT_ALIGNMENT);

        for (Anime a : animeList) {
            grid.add(buildAnimeCard(a));
        }
        return grid;
    }

    private JPanel buildAnimeCard(Anime a) {
        RoundedPanel card = new RoundedPanel(16, SURFACE);
        card.setLayout(new BorderLayout());
        card.setPreferredSize(new Dimension(220, 300));

        // poster placeholder
        RoundedPanel poster = new RoundedPanel(16, a.accent);
        poster.setLayout(new BorderLayout());
        poster.setPreferredSize(new Dimension(220, 200));

        JLabel rankBadge = new JLabel("  #" + a.rank + "  ");
        rankBadge.setOpaque(true);
        rankBadge.setBackground(new Color(0, 0, 0, 140));
        rankBadge.setForeground(Color.WHITE);
        rankBadge.setFont(new Font("SansSerif", Font.BOLD, 13));
        JPanel badgeWrap = new JPanel(new FlowLayout(FlowLayout.LEFT));
        badgeWrap.setOpaque(false);
        badgeWrap.add(rankBadge);
        poster.add(badgeWrap, BorderLayout.NORTH);

        JLabel play = new JLabel("▶", SwingConstants.CENTER);
        play.setFont(new Font("SansSerif", Font.PLAIN, 36));
        play.setForeground(new Color(255, 255, 255, 200));
        poster.add(play, BorderLayout.CENTER);

        JPanel info = new JPanel();
        info.setLayout(new BoxLayout(info, BoxLayout.Y_AXIS));
        info.setOpaque(false);
        info.setBorder(new EmptyBorder(10, 12, 12, 12));

        JLabel title = new JLabel("<html><body style='width:180px'>" + a.title + "</body></html>");
        title.setFont(new Font("SansSerif", Font.BOLD, 13));
        title.setForeground(INK);
        title.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel note = new JLabel("<html><body style='width:180px'>" + a.note + "</body></html>");
        note.setFont(FONT_SMALL);
        note.setForeground(MUTED);
        note.setAlignmentX(Component.LEFT_ALIGNMENT);
        note.setBorder(new EmptyBorder(4, 0, 0, 0));

        info.add(title);
        info.add(note);

        card.add(poster, BorderLayout.NORTH);
        card.add(info, BorderLayout.CENTER);
        return card;
    }

    // ===== Footer =====
    private JPanel buildFooter() {
        JPanel footer = new JPanel(new FlowLayout(FlowLayout.CENTER));
        footer.setOpaque(false);
        footer.setAlignmentX(Component.LEFT_ALIGNMENT);
        footer.setMaximumSize(new Dimension(Integer.MAX_VALUE, 40));

        JLabel label = new JLabel("made with 🧡 by เดียว · hosted on GitHub Pages");
        label.setFont(FONT_SMALL);
        label.setForeground(MUTED);
        footer.add(label);
        return footer;
    }

    // ===== Reusable rounded-corner panel =====
    static class RoundedPanel extends JPanel {
        private final int radius;
        private final Color bg;

        RoundedPanel(int radius, Color bg) {
            this.radius = radius;
            this.bg = bg;
            setOpaque(false);
        }

        @Override
        protected void paintComponent(Graphics g) {
            Graphics2D g2 = (Graphics2D) g.create();
            g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g2.setColor(bg);
            g2.fill(new RoundRectangle2D.Float(0, 0, getWidth(), getHeight(), radius, radius));
            g2.dispose();
            super.paintComponent(g);
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
            } catch (Exception ignored) {}
            new AnimeSpace().setVisible(true);
        });
    }
}